<template>

 <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">Durak</span>      
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Durak</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="/durak/">Home</a>
        <a class="mdl-navigation__link" href="/durak/durak">Wildcards</a>    
         <a class="mdl-navigation__link" href="/durak/durak/archive">Standings</a>     
      </nav>
    </div>
    <main class="mdl-layout__content mat-typography">
   		 <nuxt />
    </main>
  </div>



</template>

<style>
  .mdl-layout__content  {
    padding: 1em;
  }
</style>
