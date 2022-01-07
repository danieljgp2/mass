<template>
  <section>
    <b-table
        :data="resume"
        :bordered="true"
        :mobile-cards="true">

      <b-table-column
          field="user"
          :label="$t('Users')"
          :td-attrs="columnTdAttrs"
          v-slot="props">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column
          field="count"
          :label="$t('WorkShifts')"
          v-slot="props">
        {{ props.row.count }}
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">{{$t('No Records')}}</div>
      </template>

    </b-table>
  </section>
</template>

<script>
export default {
  name: 'ServiceResume',
  props: {
    resume: {
      type: Array
    }
  },
  methods: {
    columnTdAttrs(row) {
      return {
        style: {
          backgroundColor: `#${row.color}`,
          color: 'white',
          fontWeight: 'bold'
        }
      }
    }
  }
}
</script>
