<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h2 class="title is-2">Movie loader</h2>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="/">First option</b-navbar-item>
        <b-navbar-item href="/second-option">Second option</b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>