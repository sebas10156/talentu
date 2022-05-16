import { getPeople } from "./api";

const app = Vue.createApp({
  data() {
    return {
      people: [],
      newPerson: {},
      isSuccess: {}
    }
  },

  methods: {
    async loadData() {
      let response = await getPeople();
      this.people = response;
    },

    createPerson(post) {
      if (this.isSuccess.type) {
        return
      }

      if (!post.email || !post.first_name || !post.last_name || !post.birthday) {
        this.createResponse("error", "Por favor complete todos los campos");
        return
      }

      let people = JSON.parse(localStorage.getItem("talentu:people"))
      let lastId = people[(people.length - 1)].id

      post.id = lastId + 1;
      people.push(post)
      localStorage.setItem("talentu:people", JSON.stringify(people))
      this.people = people;

      this.createResponse("success", "Usuario creado");
    },

    createResponse(type, msj) {
      this.isSuccess.type = type;
      this.isSuccess.message = msj;

      setTimeout(() => {
        this.isSuccess = {}

        if (type != "error") {
          this.newPerson = {}
        }
      }, 2500)
    },

    getAge(date) {
      let explode = date.split("-")
      let birthday = new Date(explode[0], (explode[1] - 1), explode[2])

      var now = new Date();
      var age = now.getFullYear() - birthday.getFullYear();
      var month = now.getMonth() - birthday.getMonth();

      if (month < 0 || (month === 0 && now.getDate() < birthday.getDate())) {
        age--;
      }

      return age;
    },
  },

  mounted() {
    this.loadData()
  }
})

app.mount("#app");