<template>
  <b-table
      :data="calendar"
      :bordered="true"
      :mobile-cards="true">

    <b-table-column
        field="shift"
        :label="$t('WorkShift/Day')"
        v-slot="props">
      {{ props.row.range }}
    </b-table-column>

    <b-table-column
        field="monday"
        :label="$t('Monday')"
        :td-attrs="columnTdAttrs"
        v-slot="props">
      <div
          class="text-center"
          v-if="props.row.monday.isSelectable"
          @click="selectWorkShift(props.row.monday)">
        <span v-if="props.row.monday.user.id">
          {{ props.row.monday.user.name }}
        </span>
        <b-icon icon="alert" v-else />
      </div>
    </b-table-column>

    <b-table-column
        field="tuesday"
        :label="$t('Tuesday')"
        :td-attrs="columnTdAttrs"
        v-slot="props">
      <div
          class="text-center"
          v-if="props.row.tuesday.isSelectable"
          @click="selectWorkShift(props.row.tuesday)">
        <span v-if="props.row.tuesday.user.id">
          {{ props.row.tuesday.user.name }}
        </span>
        <b-icon icon="alert" v-else />
      </div>
    </b-table-column>

    <b-table-column
        field="wednesday"
        :label="$t('Wednesday')"
        :td-attrs="columnTdAttrs"
        v-slot="props">
      <div
          class="text-center"
          v-if="props.row.wednesday.isSelectable"
          @click="selectWorkShift(props.row.wednesday)">
        <span v-if="props.row.wednesday.user.id">
          {{ props.row.wednesday.user.name }}
        </span>
        <b-icon icon="alert" v-else />
      </div>
    </b-table-column>

    <b-table-column
        field="thursday"
        :label="$t('Thursday')"
        :td-attrs="columnTdAttrs"
        v-slot="props">
      <div
          class="text-center"
          v-if="props.row.thursday.isSelectable"
          @click="selectWorkShift(props.row.thursday)">
        <span v-if="props.row.thursday.user.id">
          {{ props.row.thursday.user.name }}
        </span>
        <b-icon icon="alert" v-else />
      </div>
    </b-table-column>

    <b-table-column
        field="friday"
        :label="$t('Friday')"
        v-bind:td-attrs="columnTdAttrs"
        v-slot="props">
      <div
          class="text-center"
          v-if="props.row.friday.isSelectable"
          @click="selectWorkShift(props.row.friday)">
        <span v-if="props.row.friday.user.id">
          {{ props.row.friday.user.name }}
        </span>
        <b-icon icon="alert" v-else />
      </div>
    </b-table-column>

    <b-table-column
        field="saturday"
        :label="$t('Saturday')"
        :td-attrs="columnTdAttrs"
        v-slot="props">
      <div
          class="text-center"
          v-if="props.row.saturday.isSelectable"
          @click="selectWorkShift(props.row.saturday)">
        <span v-if="props.row.saturday.user.id">
          {{ props.row.saturday.user.name }}
        </span>
        <b-icon icon="alert" v-else />
      </div>
    </b-table-column>

    <b-table-column
        field="sunday"
        :label="$t('Sunday')"
        :td-attrs="columnTdAttrs"
        v-slot="props">
      <div
          class="text-center"
          v-if="props.row.sunday.isSelectable"
          @click="selectWorkShift(props.row.sunday)">
        <span v-if="props.row.sunday.user.id">
          {{ props.row.sunday.user.name }}
        </span>
        <b-icon icon="alert" v-else />
      </div>
    </b-table-column>
  </b-table>
</template>

<script>
export default {
  name: 'ServiceDetail',
  props: {
    calendar: {
      type: Array
    },
    selectWorkShift: {
      type: Function
    }
  },
  methods: {
    columnTdAttrs(row, column) {
      const prop = row[column.field];
      return {
        class: prop.isSelectable ? 'p-2 w-100 cursor-pointer bg-red-400' : 'bg-gray-400',
        style: {
          backgroundColor: prop.user.color
              ? `#${prop.user.color}`
              : '',
          color: 'white',
          fontWeight: 'bold'
        }
      }
    }
  }
}
</script>
