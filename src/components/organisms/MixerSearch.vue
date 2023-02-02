<template>
  <div id="mixer-search">
    <div id="mixer-search__artists">
      <SearchInput placeholder="Search artists" @stringInput="searchForArtist" />
      <SearchResults v-if="show_results_artists" :list="resultsArtists" @selectItem="onSelect" />
    </div>
    <div id="mixer-search__tracks">
      <SearchInput placeholder="Search tracks" @stringInput="searchForTrack" />
      <SearchResults
        v-if="show_results_tracks"
        :list="resultsTracks"
        :show-subtitles="true"
        @selectItem="onSelect"
      />
    </div>
    <div id="mixer-search__genres">
      <SelectDropdown :options="results_genres" placeholder="Genres" @selectOption="onSelect" />
    </div>
  </div>
  <div id="mixer-search__selected">
    <SelectedItem
      v-for="(item, index) in selected"
      :key="index"
      :item="item"
      @removeItem="updateList(index)"
    />
  </div>
  <div id="mixer-search__guide">
    <div><span class="artist"></span>Artist</div>
    <div><span class="track"></span> Track</div>
    <div><span class="genre"></span> Genre</div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
import type { PropType } from 'vue'
import type { IArtist } from '@/models/IArtist'
import type { ITrack } from '@/models/ITrack'
import SearchInput from '@/components/atoms/SearchInput.vue'
import { searchArtist, searchTracks } from '@/services/api'
import SearchResults from '@/components/atoms/SearchResults.vue'
import SelectDropdown from '@/components/atoms/SelectDropdown.vue'
import SelectedItem from '@/components/molecules/SelectedItem.vue'
import type { LIST_ITEM } from '@/models/LIST_ITEM'

// Props
const props = defineProps({
  genres: {
    type: Array as PropType<String[]>,
    required: true
  }
})

function updateList(indexToRemove: number) {
  selected.value.splice(indexToRemove, 1)
}
// Emits
const emits = defineEmits<{}>()
// Composables
const results_artists = ref<IArtist[]>([])
const results_tracks = ref<ITrack[]>([])
const show_results_artists = ref<boolean>(false)
const show_results_tracks = ref<boolean>(false)

const { genres } = toRefs(props)
const selected = ref<any[]>([])

const results_genres = computed(() => {
  return genres.value.map((genre) => {
    return {
      title: genre.toString(),
      type: 'genre'
    }
  })
})
// Functions
async function searchForArtist(searchString: string) {
  if (searchString.length >= 2) {
    const result = await searchArtist(searchString)
    results_artists.value = result.items
    show_results_artists.value = true
  } else {
    results_artists.value = []
    show_results_artists.value = false
  }
}
async function searchForTrack(searchString: string) {
  if (searchString.length >= 2) {
    const result = await searchTracks(searchString)
    results_tracks.value = result.items
    show_results_tracks.value = true
  } else {
    results_tracks.value = []
    show_results_tracks.value = false
  }
}

function onSelect(item: any) {
  console.log(item)
  if (selected.value.length < 5) selected.value.push(item)
  else return
  show_results_tracks.value = false
  show_results_artists.value = false
}

const resultsArtists = computed(() => {
  return results_artists.value.map((artist) => {
    return {
      title: artist.name,
      id: artist.id,
      type: artist.type
    }
  })
})
const resultsTracks = computed(() => {
  return results_tracks.value.map((track) => {
    return {
      title: track.name,
      subtitle: track.artists[0].name,
      id: track.id,
      type: track.type
    }
  })
})

// Watchers
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
#mixer-search {
  display: flex;
  flex-wrap: wrap;
  column-gap: 12px;
  height: 30%;

  &__artists,
  &__tracks {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  &__selected {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  &__guide {
    display: flex;
    gap: 10px;
    position: absolute;
    bottom: 40px;

    > div {
      align-items: baseline;
      display: flex;
      gap: 4px;
      span {
        border-radius: 50%;
        display: inline-block;
        height: 10px;
        width: 10px;

        &.artist {
          background-color: variables.$color__blue;
        }
        &.track {
          background-color: variables.$color__green-dark;
        }
        &.genre {
          background-color: variables.$color__yellow;
        }
      }
    }
  }
}
</style>
