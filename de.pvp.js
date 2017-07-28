"use strict";

let PvP = function (
    cb,
    uri,
    ssl,
    l = [
        {url: "stun:stun.l.google.com:19302"},
        {url: "stun:stun1.l.google.com:19302"},
        {url: "stun:stun2.l.google.com:19302"},
        {url: "stun:stun3.l.google.com:19302"},
        {url: "stun:stun4.l.google.com:19302"}
    ]
) {
    this
    ._({
        cb,
        signaling: new Socket(uri, ssl).hear(this)
    })
    ._(
        new RTCPeerConnection({iceServers: l})
    )
    .on([
        "icecandidate",
        "datachannel"
    ]);
}.__({
    message: de.writable({
        value (e) {
            e.data.json && this.take(e.data.json) || this.open();
        }
    }),

    icecandidate: de.writable({
        value (e) {
            return e.candidate && this.signaling.send(this.local.json);
        }
    }),

    datachannel: de.writable({
        value (e) {
            this.talk = e.channel;
            this.cb({
                $: e.channel,
                target: e.channel
            });
        }
    }),

    open: de._({
        value () {
            this.talk = this.$.createDataChannel("talk").on("open", this.cb);
            return this.$.createOffer().then(
                (v) => this.local = v, (e) => e
            );
        }
    }),

    take: de._({
        value (signal) {
            this.remote = signal;
            return this.$.createAnswer().then(
                (v) => this.local = v, (e) => e
            );
        }
    }),

    local: de._({
        set (v) {
            this.$.setLocalDescription(new RTCSessionDescription(v));
            return true;
        },

        get () {
            return this.$.localDescription;
        }
    }),

    remote: de._({
        set (v) {
            this.$.setRemoteDescription(new RTCSessionDescription(v));
            return true;
        },

        get () {
            return this.$.remoteDescription;
        }
    })
});