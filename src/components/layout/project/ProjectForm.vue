<template>

    <form @submit.prevent="submitForm">

      <div class="form-control" :class="{invalid: !title.isValid}">
            <label for="title">Title</label>
            <input type="text" id="title" v-model.trim="title.val" @blur="clearValidity('title')" placeholder="Enter a title where each word starts by a capital leter, e.g. My Project"/>
            <p v-if="!title.isValid">Title must not be empty.</p>
        </div>

        <div class="form-control" :class="{invalid: !authors.isValid}">
            <label for="authors">Authors</label>
            <input type="text" id="authors" v-model.trim="authors.val" @blur="clearValidity('authors')" placeholder="Enter authors seperatem by comma e.g. Petras Vestartas, Tom Swin"/>
            <p v-if="!authors.isValid">Authors must not be empty.</p>
        </div>

        <div class="form-control" :class="{invalid: !date.isValid}">
            <label for="date">Date</label>
            <input type="text" id="date" v-model.trim="date.val" @blur="clearValidity('date')" placeholder="Enter Year, e.g. 2017"/>
            <p v-if="!date.isValid">Date must not be empty.</p>
        </div>

        <div class="form-control" :class="{invalid: !location.isValid}">
            <label for="location">Location</label>
            <input type="text" id="location" v-model.trim="location.val" @blur="clearValidity('location')" placeholder="Enter Location, e.g. Lausanne, Switzerland."/>
            <p v-if="!location.isValid">Location must not be empty.</p>
        </div>

        <div class="form-control">
          <label>Online</label>
          <div v-for="(url, index) in urls" :key="index" class="url-input">
            <input type="text" v-model.trim="url.val" placeholder="Enter URL" />
            <base-button type="button" @click="removeUrl(index)">Remove</base-button>
          </div>
          <base-button type="button" @click="addUrl">Add URL</base-button>
        </div>

        <div>
          <div v-for="(description, index) in descriptions" :key="index" class="description-input">
            <input type="text" v-model.trim="description.title" placeholder="Enter Description Title" />
            <textarea rows="5" v-model.trim="description.text" placeholder="Enter Description Text"></textarea>
            <base-button type="button" @click="removeDescription(index)">Remove</base-button>
          </div>
          <base-button type="button" @click="addDescription">Add Description</base-button>
        </div>

        <div class="form-control" :class="{invalid: !imageUrl.isValid}">
          <label for="imageUrl"> Main Image Url </label>
          <textarea id="imageUrl" v-model.trim="imageUrl.val" @blur="clearValidity('imageUrl')" placeholder="Enter Main Image Url Url starting with https://"></textarea>
          <p v-if="!imageUrl.isValid">Image Url must not be empty.</p> 
        </div>

        <!-- Multiple Image URLs Section -->
        <div v-for="(url, index) in figureUrls" :key="index" class="form-control" :class="{invalid: !url.isValid}">
          <label :for="'figureUrl' + index">Figure Image Url </label>
          <textarea :id="'figureUrl' + index" v-model.trim="url.val" @blur="clearValidity('figureUrls', index)" placeholder="Enter Figure Url starting with https://"></textarea>
          <p v-if="!url.isValid">Figure Url must not be empty.</p>
          <base-button @click="removeFigureUrl(index)" type="button">Remove</base-button>
        </div>
        <base-button @click="addFigureUrl" type="button">Add Figure URL</base-button>


        <!-- Publications Section -->
        <div class="form-control">
            <label>Publications</label>
            <div v-for="(publication, index) in publications" :key="index" class="publication-input">
                <input type="text" v-model.trim="publication.title" placeholder="Enter Publication Title" />
                <input type="text" v-model.trim="publication.url" placeholder="Enter Publication URL" />
                <base-button type="button" @click="removePublication(index)">Remove</base-button>
            </div>
            <base-button type="button" @click="addPublication">Add Publication</base-button>
        </div>

        <p v-if="!formIsValid">Please fix the above errors and submit again.</p>

        <div class="form-control" :class="{invalid: !types.isValid}">
          <h3>Types</h3>
          <div>
            <input type="checkbox" id="architecture" value="architecture" v-model="types.val" @blur="clearValidity('types')"/>
            <label for="architecture">architecture</label>
          </div>
          <div>
            <input type="checkbox" id="prototypes" value="prototypes" v-model="types.val" @blur="clearValidity('types')"/>
            <label for="prototypes">prototypes</label>
          </div>
          <div>
            <input type="checkbox" id="research" value="research" v-model="types.val" @blur="clearValidity('types')"/>
            <label for="research">research</label>
          </div>
          <div>
            <input type="checkbox" id="teaching" value="teaching" v-model="types.val" @blur="clearValidity('types')"/>
            <label for="teaching">teaching</label>
          </div>
          <div>
            <input type="checkbox" id="tools" value="tools" v-model="types.val" @blur="clearValidity('types')"/>
            <label for="tools">tools</label>
          </div>
          <p v-if="!types.isValid">At least one option must be checked.</p>
        </div>

        <div class="form-control" :class="{invalid: !sortId.isValid}">
            <label for="sortId">Sort ID</label>
            <input type="number" id="sortId" v-model.number="sortId.val" @blur="clearValidity('sortId')" placeholder="Enter Sort ID"/>
            <p v-if="!sortId.isValid">Sort ID must be a valid number.</p>
        </div>

        <p v-if="!formIsValid">Please fix the above errors and submit again.</p>

        <base-button type="submit">Register</base-button>

    </form>
    
</template>

<script>

export default {
    emits: ['save-data'],
    data(){
        return {
          title: { val: '', isValid: true },
          authors: { val: '', isValid: true },
          date: { val: '', isValid: true },
          location: { val: '', isValid: true },
          urls: [{ val: '', isValid: true }],
          descriptions: [{ title: '', text: '', isValid: true }],
          types: { val: [], isValid: true },
          imageUrl: { val: '', isValid: true },
          figureUrls: [{ val: '', isValid: true }],
          publications: [{ title: '', url: '', isValid: true }],
          formIsValid: true,
          sortId: { val: 0, isValid: true },
        };
    },
    methods: {

      clearValidity(field, index = null) {
        if (field === 'imageUrl') {
          this.imageUrl.isValid = this.imageUrl.val.trim() !== '';
        } else if (field === 'figureUrls' && index !== null) {
          this.figureUrls[index].isValid = this.figureUrls[index].val.trim() !== '';
        } else if (field === 'types') {
          this.types.isValid = this.types.val.length > 0;
        } else if (field === 'sortId') {
          this.sortId.isValid = !isNaN(this.sortId.val);
        } else {
          this[field].isValid = this[field].val.trim() !== '';
        }
      },
      addFigureUrl() {
        this.figureUrls.push({ val: '', isValid: true });
      },
      removeFigureUrl(index) {
        this.figureUrls.splice(index, 1);
      },

      addUrl() {
        this.urls.push({ val: '' });
      },
      removeUrl(index) {
        this.urls.splice(index, 1);
      },

      addDescription() {
          this.descriptions.push({ title: '', text: '' });
        },
      removeDescription(index) {
        this.descriptions.splice(index, 1);
      },
      addPublication() {
          this.publications.push({ title: '', url: '' });
      },
      removePublication(index) {
          this.publications.splice(index, 1);
      },
      validateForm() {
        // Validate imageUrl
        this.clearValidity('imageUrl');

        // Validate each figureUrl
        this.figureUrls.forEach((url, index) => this.clearValidity('figureUrls', index));

        // Validate types
        this.clearValidity('types');

        // Validate sortId
        this.clearValidity('sortId');

        // Check if at least one figure URL is provided and valid
        const hasValidFigureUrl = this.figureUrls.length > 0 && this.figureUrls.some(url => url.val.trim() !== '');
        const hasValidDescription = this.descriptions.length === 0 || this.descriptions.some(description => description.title.trim() !== '' && description.text.trim() !== '');

        // Set formIsValid based on all validations
        this.formIsValid = this.imageUrl.isValid && hasValidFigureUrl && this.types.isValid && hasValidDescription && this.sortId.isValid;
      },
          
    submitForm(){
      if (event.submitter && event.submitter.type === 'submit') {
        this.validateForm();
        if (!this.formIsValid) {
          return;
        }
        let urls = this.urls.map(url => url.val).filter(url => url.trim() !== '');
        if (urls.length === 0) {
          urls.push(''); // Add an empty URL if none are submitted
        }
        const formData = {
          title: this.title.val,
          authors: this.authors.val,
          date: this.date.val,
          location: this.location.val,
          urls: urls,
          descriptions: this.descriptions.map(description => ({
            title: description.title,
            text: description.text
          })), // Corrected this line
          types: this.types.val,
          imageUrl: this.imageUrl.val,
          figureUrls: this.figureUrls.map(url => url.val),
          publications: this.publications.map(publication => ({
              title: publication.title,
              url: publication.url
          })),
          sortId: this.sortId.val
        };
        this.$emit('save-data', formData);
      }
    },
  }


};

</script>

<style scoped>

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f6f6f6;
  outline: none;
  border-color: #000000;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 0px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>