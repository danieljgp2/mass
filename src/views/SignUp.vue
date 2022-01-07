<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h1 class="text-7xl">
          MaaS
        </h1>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          {{ $t('Create a new account') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ $t('Or') }}
          {{ ' ' }}
          <router-link
              to="/sign-in"
              class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {{ $t('sign in to your account') }}
          </router-link>
        </p>
      </div>
      <form @submit.prevent="submit" class="mt-8 space-y-6">
        <div>
          <label for="email">{{ $t('Email') }}</label>
          <b-field
              :type="v$.user.email.$error ? 'is-danger' : ''"
              :message="v$.user.email.$error ? $t('Invalid email') : ''">
            <b-input id="email"
                     v-model="user.email"
                     name="email"
            />
          </b-field>
        </div>
        <div>
          <label for="name">{{ $t('Name') }}</label>
          <b-field
              :type="v$.user.name.$error ? 'is-danger' : ''"
              :message="v$.user.name.$error ? $t('Name required') : ''">
            <b-input id="name"
                     v-model="user.name"
                     name="name"
            />
          </b-field>
        </div>
        <div>
          <label for="password">{{ $t('Password') }}</label>
          <b-field
              :type="v$.user.password.$error ? 'is-danger' : ''"
              :message="v$.user.password.$error ? $t('Password must contain 6 characters') : ''">
            <b-input id="password"
                     v-model="user.password"
                     name="password"
                     type="password"
                     password-reveal
            />
          </b-field>
        </div>
        <div>
          <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            {{ $t('Sign Up') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

export default {
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    loading: true,
    isFullPage: false,
    user: {
      email: '',
      password: '',
      name: ''
    }
  }),
  validations: () => ({
    user: {
      email: { required, email },
      name: { required },
      password: { required, minLength: minLength(6) }
    }
  }),
  methods: {
    ...mapGetters([
        'userLoader'
    ]),
    ...mapActions([
      'createUser',
    ]),
    async submit () {
      const result = await this.v$.$validate();
      if (!result) {
        this.$buefy.toast.open({
          message: this.$t('Something went wrong, please make sure all the required fields are present'),
          type: 'is-danger',
          pauseOnHover: true
        });
        return;
      }
      this.createUser(this.user);
    }
  }
}
</script>
