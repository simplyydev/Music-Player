new Vue({
    el: "#app",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [{
                    name: "Bella Ciao",
                    artist: "La Casa Da Papel",
                    cover: "https://github.com/Devendra20/Mini-Music-Player/blob/main/img/1.jpg",
                    source: "https://github.com/Devendra20/Mini-Music-Player/blob/main/mp3/1.mp3?raw=true",
                    url: "https://www.youtube.com/watch?v=0aUav1lx3rA",
                    favorited: false
                },
                {
                    name: "Rockstar Remix",
                    artist: "Ilkay Sencan",
                    cover: "https://github.com/Devendra20/Mini-Music-Player/blob/main/img/2.jpg",
                    source: "https://github.com/Devendra20/Mini-Music-Player/blob/main/mp3/2.mp3?raw=true",
                    url: "https://www.youtube.com/watch?v=lxM8E3Sq3-I",
                    favorited: true
                },
                {
                    name: "Blah Blah Blah",
                    artist: "Armin van Buuren",
                    cover: "https://github.com/Devendra20/Mini-Music-Player/blob/main/img/3.jpg",
                    source: "https://github.com/Devendra20/Mini-Music-Player/blob/main/mp3/3.mp3?raw=true",
                    url: "https://www.youtube.com/watch?v=mfJhMfOPWdE",
                    favorited: false
                },
                {
                    name: "Savage",
                    artist: "Timmy Trumpet",
                    cover: "https://github.com/Devendra20/Mini-Music-Player/blob/main/img/4.jpg",
                    source: "https://github.com/Devendra20/Mini-Music-Player/blob/main/mp3/4.mp3?raw=true",
                    url: "https://www.youtube.com/watch?v=ofmzX1nI7SE&list=RDGMEMYH9CUrFO7CfLJpaD7UR85w&index=23",
                    favorited: false
                },
                {
                    name: "Turn Up The Speakers",
                    artist: "Martin Garrix",
                    cover: "https://github.com/Devendra20/Mini-Music-Player/blob/main/img/5.jpg",
                    source: "https://github.com/Devendra20/Mini-Music-Player/blob/main/mp3/5.mp3?raw=true",
                    url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
                    favorited: true
                },
                {
                    name: "Toca Toca",
                    artist: "Fly Project",
                    cover: "https://github.com/Devendra20/Mini-Music-Player/blob/main/img/6.jpg",
                    source: "https://github.com/Devendra20/Mini-Music-Player/blob/main/mp3/6.mp3?raw=true",
                    url: "https://www.youtube.com/watch?v=rK5Dx4geLgs&list=RDGMEMYH9CUrFO7CfLJpaD7UR85w&index=28",
                    favorited: false
                },
                {
                    name: "Movements",
                    artist: "Pham",
                    cover: "https://github.com/Devendra20/Mini-Music-Player/blob/main/img/7.jpg",
                    source: "https://github.com/Devendra20/Mini-Music-Player/blob/main/mp3/7.mp3?raw=true",
                    url: "https://www.youtube.com/watch?v=EHzhiPOeEhY&list=RDGMEMYH9CUrFO7CfLJpaD7UR85w&index=30",
                    favorited: true
                },
                {
                    name: "She Make It Clap",
                    artist: "Admin Ross",
                    cover: "https://github.com/Devendra20/Mini-Music-Player/blob/main/img/8.jpg",
                    source: "https://github.com/Devendra20/Mini-Music-Player/blob/main/mp3/8.mp3?raw=true",
                    url: "https://www.youtube.com/watch?v=tR40FCTD_NQ",
                    favorited: false
                },
                {
                    name: "Nightmare",
                    artist: "2 Scratch",
                    cover: "https://github.com/Devendra20/Mini-Music-Player/blob/main/img/9.jpg",
                    source: "https://github.com/Devendra20/Mini-Music-Player/blob/main/mp3/9.mp3?raw=true",
                    url: "https://www.youtube.com/watch?v=0ZYgo-fZUg0&list=RDGMEMHDXYb1_DDSgDsobPsOFxpA&index=5",
                    favorited: false
                }
            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
            ].favorited;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function() {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function() {
            vm.generateTime();
        };
        this.audio.onended = function() {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };

        // this is optional (for preload covers)
        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});