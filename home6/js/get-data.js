const GetData = {
    name: 'get-data',
    data() {
        return {
            API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
            errorMessage: '',
            error: false
        }
    },
    created() {
        this.$options.template =
            `<div>
                ${this.$options.template}
                <div v-if="error" class="popup">
                    <p>Ошибка получения данных! {{errorMessage}}</p>
                    <button @click="close">OK</button>
                </div>
            </div>`
    },
    methods: {
        getJson(url) {
            return fetch(this.API + url, {cache: "no-store"})
                .then(result =>
                    result.json())
                .catch(error => {
                    this.errorMessage = error;
                    this.error = true;
                });
        },
        close() {
            this.error = false;
        }
    }
}