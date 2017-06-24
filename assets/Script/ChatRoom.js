let Socket = require('socket')

cc.Class({
    extends: cc.Component,

    properties: {
      
        nameBox: cc.Node,   //名字输入框
        inputBox: cc.Node,  //消息输入框
        content: cc.Node,   //列表区
        chatBarPrefab: cc.Prefab,
    },

    // use this for initialization
    init() {
        let PBHelper = require('pbhelper');
        let pbHelper = new PBHelper();
        let PB = pbHelper.loadFile('resources/proto', 'grace.proto.msg');
        let socket = Socket('ws://localhost:3000');

        socket.on(PB.ActionCode.EnterRoot, (protoData) => {
            let chatMsg = PB.ChatMsg.decode(protoData);
            this._onPlayEnter(chatMsg);    
        });

        socket.on(PB.ActionCode.RecvMessage, (protoData) => {
            let chatMsg = PB.ChatMsg.decode(protoData);
            this._onRecvMessage(chatMsg);   
        });

        global.PB = PB;
        global.pbHelper = pbHelper;
        global.socket = socket;
    },

    onLoad() {
        //隐藏文字输入框
        this.inputBox.active = false;
        this.init();
    },

    _onPlayEnter(chatMsg) {
        let node = new cc.Node();
        node.color = cc.Color.RED;
        let label = node.addComponent(cc.Label);
        label.string = chatMsg.message;
        this.content.addChild(node);
    },

    _onRecvMessage(chatMsg) {
        let chatBar = cc.instantiate(this.chatBarPrefab);
        this.content.addChild(chatBar);
        chatBar = chatBar.getComponent('ChatBar');
        chatBar.message = chatMsg.message;
        chatBar.nameLabel.string = chatMsg.playerInfo.name;
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

    send(target) {
        var editBox = this.inputBox.getChildByName('editBox').getComponent(cc.EditBox); 
        if (!editBox.string) {
            return;
        } 
        var chatMsg = new PB.ChatMsg();
        chatMsg.playerInfo = new PB.Player();
        chatMsg.playerInfo.name = this.playerName;
        chatMsg.message = editBox.string;
        socket.send(PB.ActionCode.SendMessage, chatMsg, (protoData) => {
            cc.log('发送成功');
            let chatMsg = PB.ChatMsg.decode(protoData);
            let chatBar = cc.instantiate(this.chatBarPrefab);
            this.content.addChild(chatBar);
            chatBar = chatBar.getComponent('ChatBar');
            chatBar.message = chatMsg.message;
            chatBar.nameLabel.string = chatMsg.playerInfo.name;
            chatBar.direction = 1;
        });
    }

});
