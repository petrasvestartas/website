<template>
    <form @submit.prevent="submitForm">

        <div class="form-control">
            <label for="email">Your Email</label>
            <input type="email" id="email" v-model.trim="email"/>
        </div>
        <div class="form-control">
            <label for="message">Message</label>
            <textarea id="message" rows="5" v-model.trim="message"></textarea>
        </div>
        <div class="actions">
            <base-button>Send Message</base-button>
        </div>
        <p class="errors" v-if="!formIsValid">Please enter a valid email and message.</p>


    </form>   
</template>

<script>
// import BaseButton from '../../components/ui/BaseButton.vue';
    export default{
        data(){
            return {
                email: '',
                message: '',
                formIsValid: true
            };
        },
        methods: {
            submitForm(){
                this.formIsValid = true;
                if(this.email === '' || !this.email.includes('@') || this.message === ''){
                    this.formIsValid = false;
                    return;
                }
                this.$store.dispatch('requests/contactProject', { 
                    email: this.email,
                    message: this.message,
                    // projectId: $this.route.params.id,
                    projectId: this.$route.params.id || 'undefined',
                });

                this.$router.replace('/projects');
            }
        },
    }

</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  /* border-radius: 12px; */
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #242424;
  background-color: #f3f3f3;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>