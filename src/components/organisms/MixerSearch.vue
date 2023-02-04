<template>
  <div id="mixer-search" @click="show_results_artists = false">
    <div id="mixer-search-input-wrapper">
      <div id="mixer-search-input__artists">
        <TextInput
          v-model="searchStringArtist"
          placeholder="...artists"
          @update:model-value="searchForArtist"
        />
        <SearchResults
          v-if="show_results_artists"
          :list="resultsArtists"
          @selectItem="onSelect"
          @close-overlay="toggleResultList"
        />
      </div>
      <div id="mixer-search-input__tracks">
        <TextInput
          v-model="searchStringTrack"
          placeholder="...tracks"
          @update:model-value="searchForTrack"
        />
        <SearchResults
          v-if="show_results_tracks"
          :list="resultsTracks"
          :show-subtitles="true"
          @selectItem="onSelect"
          @close-overlay="toggleResultList"
        />
      </div>
      <div id="mixer-search-input__genres">
        <SelectDropdown
          :options="results_genres"
          placeholder="...genres"
          @selectOption="onSelect"
        />
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
      |
      <p class="disclaimer">* You need to select at least one</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
import type { PropType } from 'vue'
import type { IArtist } from '@/models/IArtist'
import type { ITrack } from '@/models/ITrack'
import TextInput from '@/components/atoms/TextInput.vue'
import { searchArtist, searchTracks } from '@/services/api'
import SearchResults from '@/components/atoms/SearchResults.vue'
import SelectDropdown from '@/components/atoms/SelectDropdown.vue'
import SelectedItem from '@/components/molecules/SelectedItem.vue'

// Props
const props = defineProps({
  genres: {
    type: Array as PropType<String[]>,
    required: true
  }
})
// Emits
const emits = defineEmits<{
  (e: 'emitSeeds', artists: string[], tracks: string[], genres: string[]): void
}>()
// Composables
const { genres } = toRefs(props)
const results_artists = ref<IArtist[]>([])
const results_tracks = ref<ITrack[]>([])
const show_results_artists = ref<boolean>(false)
const show_results_tracks = ref<boolean>(false)
const search_string = ref<string>('')
const selected = ref<any[]>([])
const searchStringArtist = ref<string>('')
const searchStringTrack = ref<string>('')

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
  search_string.value = searchString
  if (searchString.length >= 2) {
    const result = await searchTracks(searchString)
    results_tracks.value = result.items
    show_results_tracks.value = true
  } else {
    results_tracks.value = []
    show_results_tracks.value = false
  }
}
function toggleResultList() {
  show_results_artists.value = false
  show_results_tracks.value = false
  searchStringArtist.value = ''
  searchStringTrack.value = ''
}
function onSelect(item: any) {
  if (selected.value.length >= 5) return
  if (selected.value.length < 5) {
    selected.value.push(item)
    handleSelectedList()
  }
  toggleResultList()
}
function updateList(indexToRemove: number) {
  selected.value.splice(indexToRemove, 1)
  handleSelectedList()
}
function handleSelectedList() {
  const artistsArr: string[] = []
  const tracksArr: string[] = []
  const genreArr: string[] = []

  selected.value.forEach((select) => {
    if (select.type === 'artist') artistsArr.push(select.id)
    if (select.type === 'track') tracksArr.push(select.id)
    if (select.type === 'genre') genreArr.push(select.title)
  })
  emits('emitSeeds', artistsArr, tracksArr, genreArr)
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
  flex-direction: column;
  gap: 36px;
  grid-template-columns: variables.$grid-template-standard;
  height: 100%;
  position: relative;

  &-input {
    &-wrapper {
      display: flex;
      gap: 12px;
    }
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
    bottom: 0;
    p {
      font-size: variables.$font-size-paragraph__small;
      font-style: italic;
    }

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
