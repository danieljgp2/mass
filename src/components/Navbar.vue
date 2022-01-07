<template>
  <b-navbar type="is-black p-3">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h1 class="text-4xl">MaaS</h1>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="/">
        {{$t('Services')}}
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <b-navbar-dropdown :label="$t('Language')">
          <b-navbar-item @click="changeLanguage('en')">
            {{$t('English')}}
          </b-navbar-item>
          <b-navbar-item @click="changeLanguage('es')">
            {{$t('Spanish')}}
          </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <b-navbar-dropdown :label="user.name">
          <b-navbar-item @click="close()">
           {{$t('Log Out')}}
          </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import i18n from "../i18n";

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'logOut',
    ]),
    close () {
      this.logOut();
    },
    changeLanguage(language) {
      localStorage.setItem('language', language);
      i18n.locale = language;
    }
  }
}
</script>
