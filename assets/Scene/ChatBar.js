let Direction = cc.Enum({
    LEFT: -1,
    RIGHT: -1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: cc.Label,
        messageLabel: cc.Label,
        layout: cc.Layout,

        message: {
            default: '',
            notify() {
                this.messageLabel.string = this.message;
                setTimeout(() => {
                    let height = this.messageLabel.node.height;
                    if (height < 60) {
                        height = 60;
                    }
                    this.node.height = height * 1.2;   
                      
                })
            }
        },

        direction: {
            type: Direction,
            default: Direction.LEFT,
            notify() {
                this._updateDirection();
            }
        }
    },

    _updateDirection() {
        if (this.direction === Direction.LEFT) {
            this.layout.horizontalDirection = cc.Layout.HorizontalDirection.LEFT_TO_RIGHT;
            this.messageLabel.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        } else {
            this.layout.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT;
            this.messageLabel.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
        }
    },
    // use this for initialization
    onLoad() {
        this._updateDirection();
    },
});
