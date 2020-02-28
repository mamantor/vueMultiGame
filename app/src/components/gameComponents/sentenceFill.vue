<template>

    <div>
        fill this sentence ...
        {{wording}}
         <div v-if="scoring" v-html="wordingAnswered"></div>
        <countdown ref="countdown" :time="30*1000" @end="endGame"/>
    </div>
</template>


<script>
import countdown from './countdown.vue'


export default {
    name: 'sentenceFill',
    data: function (){
        return{
            wording: "",
            answer: "",
            answersShownCount: 0
        }
    },
    components: {
        countdown
    },
    props: ["allUserAnswered"],
    watch: {
        allUserAnswered: function(newVal, oldVal) {
            if(newVal==true){
                console.log('tous les joueurs ont rep')
                this.endGame()
            }
        },
        scoring: function(newVal, oldVal) {
            if(newVal==true){
                console.log('scoring changed')
                this.showAnswers(Object.values(this.$store.state.answers)[this.answersShownCount])
            }
        }
    },
    created: function() {
        this.getWording();
        this.$store.commit("gameState", "playing")
        this.$socket.emit("playing")
    },
    computed: {
        wordingAnswered() {
            return `<span>${this.wording.replace("__", `<span class=\"answer\">${this.answer}</span>`)}</span>`
        },
        scoring() {
           
            return this.$store.state.gameState.scoring
        }
    },
    methods: {
        endGame() {
            console.log('this game is over man')
            this.$store.commit("gameState", "scoring")
            this.$socket.emit("scoring")
            this.$refs.countdown.abort();
        },
        showAnswers(answer) {
            console.log(`actually displaying %s`, answer)
            console.log(`received %d answers`,this.$store.state.answerCount)
            console.log(`shown %d answers`,this.answersShownCount)
            this.answer = answer
            this.answersShownCount++
            if(this.answersShownCount != this.$store.state.answerCount){
                setTimeout(()=> {
                    const newAnswer = Object.values(this.$store.state.answers)[this.answersShownCount]
                    this.showAnswers(newAnswer)
                }, 5000)
            }
        },
        getWording() {
            console.log("getwording")
            var countRef = this.$fb.database.ref(`content/games/sentencefill/wordings/count`);
            let count;
            return countRef.once('value', snapshot => {
                if (snapshot.val()==null) {
                    console.log('pas trouvé de count')
                } else {
                    count = snapshot.val()
                    console.log(count)
                }
            })
            .then(() =>{
                const rdmWordingId = Math.floor(Math.random() * (count + 1));
                console.log("rdmWordingId")
                console.log(rdmWordingId)
                var wordingRef = this.$fb.database.ref(`content/games/sentencefill/wordings/${rdmWordingId}`);
                return wordingRef.once('value', snapshot => {
                    if (snapshot.val()==null) {
                        console.log('pas trouvé de wording')
                        return ''
                    } else {
                        let wording = snapshot.val()
                        this.wording =  wording.title                    
                    }
                });
            });
        },
    }
 
}
</script>