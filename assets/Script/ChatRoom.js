require('./common/useglobal');

cc.Class({
    extends: cc.Component,

    properties: {
      
        nameBox: cc.Node,   //名字输入框
        inputBox: cc.Node,  //消息输入框
        content: cc.Node,   //列表区
        chatBarPrefab: cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        //隐藏文字输入框
        this.inputBox.active = false;
    },

    /**
     * 输入名字时响应
     */
    onEnterName(sender) {
        cc.log(sender.string);
        if (!sender.string) {
            return;
        }
        

        this.playerName = sender.string;

        const chatMsg = new PB.ChatMsg();
        chatMsg.playerInfo = new PB.Player();
        chatMsg.playerInfo.name = sender.string;
        chatMsg.message = sender.string + '进入聊天室';
        socket.send(PB.ActionCode.EnterRoot, chatMsg, (protoData) => {
            var chatMsg = PB.ChatMsg.decode(protoData);
            cc.log(chatMsg);

            this.nameBox.active = false;
            this.inputBox.active = true;
        });
    },

    send: function() {
        var editBox = this.inputBox.getChildByName('editBox').getComponent(cc.EditBox); 
        if (!editBox.string) {
            return;
        } 
        var chatMsg = new PB.ChatMsg();
        chatMsg.playerInfo = new PB.Player();
        chatMsg.playerInfo.name = this.playerName;
        chatMsg.message = editBox.string;

        socket.send(PB.ActionCode.SendMessage, chatMsg, (protoData) => {
            let chatMsg = PB.ChatMsg.decode(protoData);
            let chatBar = cc.instantiate(this.chatBarPrefab);
            this.content.addChild(chatBar);
            chatBar.getComponent('ChatBar').message = chatMsg.message;
            // cc.log(JSON.stringify(chatMsg));

        });
    }

});
