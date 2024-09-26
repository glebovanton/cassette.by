export const loadingPlaceholder = 'src/statics/icons/loading-placeholder.svg';
export const defaultThumbnail = 'src/statics/icons/default-thumbnail.png';
export const HOMEPAGE_QUERY = `query MyQuery($limit: IntType) {
  allServices(first: $limit) {
    _allNameLocales {
      locale
      value
    }
    _allDescriptionLocales {
      locale
      value
    }
  }
  allStudents(first: $limit) {
    _allNameLocales {
      locale
      value
    }
    _allSurnameLocales {
      locale
      value
    }
    imgsrc {
      url
    }
    _allDescriptionLocales {
      locale
      value
    }
    _allTeaserLocales {
      locale
      value
    }
  }
  allTeachers(first: $limit) {
    _allNameLocales {
      locale
      value
    }
    _allSurnameLocales {
      locale
      value
    }
    _allProfessionLocales {
      locale
      value
    }
    _allDescriptionLocales {
      locale
      value
    }
    facebook
    instagram
    vk
    telegram
    imgsrc {
      url
    }
  }
  allFeedbacks(first: $limit) {
    name
    description
    imgsrc {
      url
    }
    link
    video {
      url
    }
    videoLink {
      url
    }
  }
  allPrices {
    _allTariffsLocales {
      value
    }
    _allTitleLocales {
      value
    }
  }
}`;
