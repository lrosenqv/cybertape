<template>
  <div
    id="mixer-search"
    :class="{ __collapsed: !searchOpen && mobileView }"
    @click="show_results_artists = false"
  >
    <template v-if="!mobileView || searchOpen">
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
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { searchArtist, searchTracks } from '@/services/api'
import type { IArtist } from '@/models/IArtist'
import type { ITrack } from '@/models/ITrack'
import type { PropType } from 'vue'
import { ref, toRefs, computed } from 'vue'
import SearchResults from '@/components/general/SearchResults.vue'
import SelectDropdown from '@/components/general/SelectDropdown.vue'
import SelectedItem from '@/components/SelectedItem.vue'
import TextInput from '@/components/general/TextInput.vue'

// Props
const props = defineProps({
  genres: {
    type: Array as PropType<String[]>,
    required: true
  },
  mobileView: {
    type: Boolean,
    required: true
  },
  searchOpen: {
    type: Boolean,
    required: true
  }
})
// Emits
const emits = defineEmits<{
  (e: 'emitSeeds', artists: string[], tracks: string[], genres: string[]): void
}>()
// Composables
const { genres, mobileView, searchOpen } = toRefs(props)
const searchStringArtist = ref<string>('')
const searchStringTrack = ref<string>('')
const show_results_artists = ref<boolean>(false)
const show_results_tracks = ref<boolean>(false)
const selected = ref<any[]>([])
const results_artists = ref<IArtist[]>([])
const results_tracks = ref<ITrack[]>([])
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
function toggleResultList() {
  show_results_artists.value = false
  show_results_tracks.value = false
  searchStringArtist.value = ''
  searchStringTrack.value = ''
}
function onSelect(item: any) {
  const amountOfType = selected.value.map((select) => {
    return select.type === item.type
  })
  if (amountOfType.length >= 5) return
  else {
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
</script>

<style lang="scss">
@use '@/style/variables.scss';
#mixer-search {
  display: grid;
  flex-direction: column;
  gap: 6px;
  grid-template-columns: 1fr;
  height: 100%;
  grid-template-rows: auto 1fr 10%;
  position: relative;
  &.__collapsed {
    gap: 0;
    height: 0;
  }
  &-input {
    &-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 5px;
    }
    &__artists,
    &__tracks {
      flex-grow: 1;
    }
  }
  &__selected {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    grid-row: 2;
    height: fit-content;
  }
  &__guide {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    grid-row: 3;
    margin-top: auto;
    p {
      font-style: italic;
      @include variables.font-size-paragraph__small;
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
  @media screen and (min-width: 769px) {
    gap: 10px;
    grid-template-rows: auto 1fr 10%;
    height: 100%;
    &-selected {
      gap: 12px;
    }
  }
  @media screen and (min-width: 1024px) {
    grid-template-rows: auto 1fr 5%;
    gap: 20px;
  }
}
</style>
