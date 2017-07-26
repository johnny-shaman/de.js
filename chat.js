(() => {
    "use strict";

//-----------------main part-----------------

    let Session = function () {
        this
        ._({
            article: 
                article
                .$(p.$("Please Wait for coming."))
                .css({
                    minHeight: "320px",
                    maxHeight: "320px",
                    height: "320px",
                    overflowY: "scroll"
                }),

            text:
                input
                .css({
                    width: "25%",
                    minWidth:"240px"
                }),

            talk: new PvP((e) => {
                this._(e.$).on("message");
                this.article.$([
                    p.$("Guest is Connected."),
                    p.$("Please enjoy on talking."),
                ]);
                this.text.on("keypress", this).focus();
            })
        });
    }._({
        keypress (e) {
            switch (e.keyCode) {
                case 13: {
                    this.article.$(p.$("<-: " + this.text.value).css({color: "#aaaaaa"}));
                    this.$.say(this.text.value);
                    this.text.value = "";
                    this.text.scrollTo(0, this.text.offsetTop);
                    return true;
                }
                default: return false;
            }
        },

        message (e) {
            this.article.$(p.$("->: " + e._));
            this.text.scrollTo(0, this.text.offsetTop);
        }
    });

    let session = new Session();

//-------section of view definition-------

    $.body.$(article.$([
        header.$([
            h1.$(
                a.$("de.js")._({href: "./"})
            ),
            h2.$(
                a.$("de.js pvp tester")._({href: "./"})
            )
        ]),

        article.$([
            "article",
            "text"
        ].map((v) => session[v]))
    ]).css({width: "240px", margin: "auto"}));
})();
