<template>
  <div v-if="coffee.length > 0">
    <v-layout align-start justify-space-between row>
      <h1 class="subheading grey--text mt-1">Dashboard</h1>

      <div class="right">
        <v-dialog width="80em">
          <v-btn slot="activator">
            <v-icon>donut_large</v-icon>
          </v-btn>
          <v-card>
            <v-container grid-list-lg>
              <v-layout align-center justify-center row wrap>
                <div id="container"></div>
              </v-layout>
            </v-container>
          </v-card>
        </v-dialog>
      </div>
    </v-layout>
    <v-container class="my-3">
      <v-layout row wrap align-center class="mb-3">
        <v-flex xs12 sm12 md6>
          <v-tooltip top>
            <v-btn
              small
              flat
              color="grey"
              @click="sortBy('created_at')"
              :class="sortSwitch ? 'v-btn--active' : ''"
              slot="activator"
            >
              <v-icon small left>folder</v-icon>
              <span class="caption text-lowercase">By Most Recent</span>
            </v-btn>
            <span>Sort by most recent</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn
              small
              flat
              color="grey"
              @click="sortBy('coffee_name')"
              :class="!sortSwitch ? 'v-btn--active' : ''"
              slot="activator"
            >
              <v-icon small left>list</v-icon>
              <span class="caption text-lowercase">By Coffee Name</span>
            </v-btn>
            <span>Sort by coffee Name</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn
              :class="filteredByFavorite ? 'v-btn--active' : ''"
              small
              flat
              color="grey"
              @click="filteredByFavorite = !filteredByFavorite && searchCoffee('favorite')"
              slot="activator"
            >
              <v-icon small left>check</v-icon>
              <span class="caption text-lowercase">By Favorite</span>
            </v-btn>
            <span>Sort by favorite coffee</span>
          </v-tooltip>
        </v-flex>
        <v-flex xs12 sm12 md6>
          <v-text-field
            append-icon="search"
            label="Search by Coffee Name"
            @input="searchCoffee"
            v-model="searchWord"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-card class="grey lighten-5" v-for="c in searchCoffee()" :key="c.id">
        <v-layout row wrap :class="`pa-3 coffee ${c.origin.replace(' ', '-').toLowerCase()}`">
          <v-flex xs12 md4>
            <div class="caption grey--text">Coffee Name</div>
            <div class="headline my-1">{{ c.coffee_name }}</div>
          </v-flex>
          <v-flex xs12 sm4 md3>
            <div class="caption grey--text">Processing Method</div>
            <div class="title mb-1 mt-2">{{ c.processing_method }}</div>
          </v-flex>
          <v-flex xs12 sm4 md3>
            <div class="caption grey--text">Origin</div>
            <v-chip
              small
              :class="`title ${c.origin.replace(' ', '-').toLowerCase()} white--text my-2 `"
            >{{ c.origin }}</v-chip>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <div class="right">
              <v-btn
                color="accent"
                :to="{name: 'coffee', params:{users_id: c.users_id, coffee_id: c.id}}"
                fab
              >
                <v-icon>forward</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
  <div v-else>
    <v-container class="my-3" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <v-card color class="grey--text">
            <v-card-title primary-title class="grey lighten-2">
              <v-layout align-center justify-center row wrap fill-height>
                <div class="display-2 grey--text text--darken-2">
                  Welcome to
                  <span class="font-weight-light">Un</span>
                  <span>Brewed</span>
                </div>
              </v-layout>
            </v-card-title>
            <v-layout align-center justify-center row wrap fill-height class="pa-4">
              <div
                class="headline grey--text text--darken-2 mt-1"
              >Get Started With Adding a Coffee to Your Logs</div>
              <v-btn color="accent" :to="{name: 'add_coffee'}" fab>
                <v-icon>add</v-icon>
              </v-btn>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_USERS_COFFEE } from "@/store/actions.type";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      user: "",
      searchWord: "",
      filteredByFavorite: false,
      sortSwitch: true
    };
  },
  computed: {
    ...mapGetters(["coffee"])
  },
  methods: {
    sortBy(prop) {
      if (prop === "created_at") {
        this.coffee.sort((a, b) => (a[prop] > b[prop] ? -1 : 1));
        this.sortSwitch = true;
      } else {
        this.coffee.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
        this.sortSwitch = false;
      }
    },
    searchCoffee(prop) {
      return this.coffee.filter(el => {
        let include = true;
        if (this.filteredByFavorite && !el.favorite) include = false;
        return (
          include &&
          el.coffee_name.toLowerCase().includes(this.searchWord.toLowerCase())
        );
      });
    }
  },
  created() {
    this.$store.dispatch(GET_USERS_COFFEE, this.$route.params.users_id);
    // this.$store.dispatch(GET_USERS_COFFEE, this.$store.state.auth.user.id);
    setTimeout(() => {
      anychart.onDocumentReady(function() {
        // The data used in this sample can be obtained from the CDN
        // https://cdn.anychart.com/samples/sunburst-charts/coffee-flavour-wheel/data.json
        anychart.data.loadJsonFile(
          "https://cdn.anychart.com/samples/sunburst-charts/coffee-flavour-wheel/data.json",
          function(data) {
            // makes tree from the data for the sample
            var dataTree = anychart.data.tree(data, "as-table");

            // create sunburst chart
            var chart = anychart.sunburst(dataTree);

            // set calculation mode
            chart.calculationMode("ordinal-from-root");

            // set chart title
            // chart.title("Coffee Flavour Wheel");

            // set settings for the penultimate level labels
            chart
              .level(-2)
              .labels()
              .position("radial");

            // set chart labels settings
            chart.labels().hAlign("center");

            // set settings for leaves labels
            chart
              .leaves()
              .labels()
              .minFontSize(8)
              .textOverflow("...");

            // the fill specified in the data has priority
            // set point fill
            chart.fill(function() {
              return anychart.color.darken(this.parentColor, 0.15);
            });

            // set container id for the chart
            chart.container("container");
            // initiate chart drawing
            chart.draw();
          }
        );
      });
    }, 3000);
    // end
  }
};
// window.scrollTo(x-coord, y-coord);
</script>

<style>
#container {
  width: 80em;
  height: 47em;
}
.anychart-credits-logo {
  display: none;
}
.anychart-credits-text {
  color: white;
}
.coffee {
  border-left: 4px solid #a1887f;
}
.coffee.burndi {
  border-left: 4px solid #66bb6a;
}
.coffee.ethiopia {
  border-left: 4px solid #f8bbd0;
}
.coffee.malawi {
  border-left: 4px solid #388e3c;
}
.coffee.kenya {
  border-left: 4px solid #ccff90;
}
.coffee.rawanda {
  border-left: 4px solid #fdd835;
}
.coffee.tanzania {
  border-left: 4px solid #3949ab;
}
.coffee.zambia {
  border-left: 4px solid #3949ab;
}
.coffee.indonesia {
  border-left: 4px solid #a1887f;
}
.coffee.papa-new-guinea {
  border-left: 4px solid #ff4081;
}
.coffee.vietnam {
  border-left: 4px solid #1b5e20;
}
.coffee.yemen {
  border-left: 4px solid #8c9eff;
}
.coffee.puerto-rico {
  border-left: 4px solid #f41c1c;
}
.coffee.bolivia {
  border-left: 4px solid #ccff90;
}
.coffee.brazil {
  border-left: 4px solid #ffeb3b;
}
.coffee.colombia {
  border-left: 4px solid #82b1ff;
}
.coffee.costa-rica {
  border-left: 4px solid #9ccc65;
}
.coffee.dominican-republic {
  border-left: 4px solid #33691e;
}
.coffee.ecuador {
  border-left: 4px solid #82b1ff;
}
.coffee.el-salvador {
  border-left: 4px solid #fdd835;
}
.coffee.guatemala {
  border-left: 4px solid #aa00ff;
}

.coffee.hawaii {
  border-left: 4px solid #0091ff;
}
.coffee.honduras {
  border-left: 4px solid #00e676;
}
.coffee.nicaragua {
  border-left: 4px solid #00e676;
}
.coffee.jamaica {
  border-left: 4px solid #1a7ff2;
}
.coffee.peru {
  border-left: 4px solid #fb8c00;
}
.coffee.venezuela {
  border-left: 4px solid #ff9100;
}
/* Chips */

.v-chip.title {
  background: #a1887f;
}
.v-chip.burndi {
  background: #66bb6a;
}
.v-chip.ethiopia {
  background: #f8bbd0;
}
.v-chip.malawi {
  background: #388e3c;
}
.v-chip.kenya {
  background: #ccff90;
}
.v-chip.rawanda {
  background: #fdd835;
}
.v-chip.tanzania {
  background: #3949ab;
}
.v-chip.zambia {
  background: #3949ab;
}
.v-chip.indonesia {
  background: #a1887f;
}
.v-chip.papa-new-guinea {
  background: #ff4081;
}
.v-chip.vietnam {
  background: #1b5e20;
}
.v-chip.yemen {
  background: #8c9eff;
}
.v-chip.puerto-rico {
  background: #f41c1c;
}
.v-chip.bolivia {
  background: #ccff90;
}
.v-chip.brazil {
  background: #ffeb3b;
}
.v-chip.colombia {
  background: #82b1ff;
}
.v-chip.costa-rica {
  background: #9ccc65;
}
.v-chip.dominican-republic {
  background: #33691e;
}
.v-chip.ecuador {
  background: #82b1ff;
}
.v-chip.el-salvador {
  background: #fdd835;
}
.v-chip.guatemala {
  background: #aa00ff;
}
.v-chip.hawaii {
  background: #0091ff;
}
.v-chip.honduras {
  background: #00e676;
}
.v-chip.nicaragua {
  background: #00e676;
}
.v-chip.jamaica {
  background: #1565c0;
}
.v-chip.peru {
  background: #fb8c00;
}
.v-chip.venezuela {
  background: #ff9100;
}
</style>
