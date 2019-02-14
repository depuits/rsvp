<template>
	<let-it-snow
      v-bind="snowConf"
      :show="show"    
    ></let-it-snow>
<template>    

<script>
export default {
  name: 'app',
  data () {
  	return {
        snowConf: {
            windPower : 1,  
            speed : 3,
            count : 12,
            size : 10,
            opacity : 1,
            images: ['https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/snow.png',
                    'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/sock.png',
                    'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/tree.png']
        },
        show: false      
    }
  },
  mounted () {
      this.show = true
    //   setTimeout( () => {
    //       this.show = false
    //   }, 5000)

    //   setTimeout( () => {
    //       this.show = true
    //   }, 10000)      
  }  
}
</script>