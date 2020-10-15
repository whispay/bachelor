<template>
    <nav>
        <!-- Toolbar verwenden Flexbox -->
       <v-app-bar app class="primary" flat>
           <v-app-bar-nav-icon class="white--text" @click="drawer =!drawer"></v-app-bar-nav-icon>
           <v-toolbar-title class="text-uppercase white--text">
               <span class="font-weight-light">
                   SAP
               </span>
               <span>WEB</span>
           </v-toolbar-title>
           <v-spacer></v-spacer>

           <LoginPopup />

       </v-app-bar>

       <v-navigation-drawer app v-model="drawer" class="secondary">
         <v-list>
             <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                 <v-list-item-action>
                     <v-icon class="white--text">{{link.icon}}</v-icon>
                 </v-list-item-action>
                 <v-list-item-content>
                     <v-list-item-title class="white--text">
                         {{link.text}}
                     </v-list-item-title>
                 </v-list-item-content>
             </v-list-item>
         </v-list>
       </v-navigation-drawer>

    </nav>
</template>



<script>
import LoginPopup from '../components/LoginPopup'
export default {
    components: { LoginPopup },
    data(){
        return{
            drawer: false,
            links:[
                { icon: 'home', text:'Home' , route: '/'},
                { icon: 'show_chart', text: 'Graph', route: '/graph'},
                { icon: 'person', text: 'Team', route: '/team'},
            ]
        }
    }
}
</script>