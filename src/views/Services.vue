<template>
  <div>
    <b-dropdown aria-role="list">
      <template #trigger="{ active }">
        <b-button
            :label="service.name || $t('Select a service')"
            :icon-right="active ? 'menu-up' : 'menu-down'" />
      </template>

      <b-dropdown-item v-for="service in services" @click="selectService(service)" aria-role="listitem" :key="service.id">
       {{ service.name }}
      </b-dropdown-item>
    </b-dropdown>
    <b-dropdown aria-role="list" v-if="service.id">
      <template #trigger="{ active }">
        <b-button
            :label="week.text || $t('Select a week')"
            :icon-right="active ? 'menu-up' : 'menu-down'" />
      </template>

      <b-dropdown-item v-for="week in weeks" @click="selectWeek(week, service)" aria-role="listitem" :key="week.date">
        {{ week.text }}
      </b-dropdown-item>
    </b-dropdown>
    <b-tabs v-model="activeTab" expanded type="is-toggle" class="pt-2 pb-2">
      <b-tab-item :label="this.$t('Calendar')" icon="calendar" >
        <ServiceDetail
            v-if="week.date"
            v-bind:calendar="this.calendar"
            v-bind:selectWorkShift="this.selectWorkShift"
        />
      </b-tab-item>

      <b-tab-item :label="this.$t('Resume')" icon="book">
        <ServiceResume
            v-if="week.date"
            v-bind:resume="this.resume"
        />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ServiceDetail from "../components/ServiceDetail";
import ServiceResume from "../components/ServiceResume";

export default {
  name: 'Services',
  data() {
    return {
      activeTab: 0
    }
  },
  components: {
    ServiceDetail,
    ServiceResume
  },
  mounted() {
    this.getServices();
  },
  computed: {
    ...mapGetters([
      'services',
      'service',
      'week',
      'weeks',
      'calendar',
      'user',
      'resume'
    ])
  },
  methods: {
    ...mapActions([
      'setService',
      'setWeek',
      'getServices',
      'createWorkShift',
      'destroyWorkShift'
    ]),
    selectService (service) {
      this.setService(service);
    },
    selectWeek (week, service) {
      this.setWeek({ week, service });
    },
    selectWorkShift(workShift) {
      if (this.user.id === workShift.user.id) {
        this.destroyWorkShift(workShift);
      } else if(!workShift.user.id) {
        this.createWorkShift(workShift);
      } else {
        this.$buefy.toast.open({
          message: this.$t('This work shift is already taken'),
          type: 'is-danger',
          pauseOnHover: true
        });
      }
    }
  }
}
</script>
