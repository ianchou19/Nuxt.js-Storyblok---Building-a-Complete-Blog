<template>
  <section id="posts">
    <PostPreview
      v-for="post in posts"
      :id="post.id"
      :key="post.id"
      :title="post.title"
      :excerpt="post.previewText"
      :thumbnailImage="post.thumbnailUrl"
    />
  </section>
</template>

<script>
import PostPreview from '@/components/Blog/PostPreview'

export default {
  components: {
    PostPreview
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        version: context.isDev ? 'draft' : 'published',
        starts_with: 'blog/'
      })
      .then((res) => {
        // console.log(res)
        // return res.data.stories
        return {
          posts: res.data.stories.map((bp) => {
            return {
              id: bp.slug,
              title: bp.content.title,
              previewText: bp.content.summary,
              thumbnailUrl: bp.content.thumbnail
            }
          })
        }
      })
  }
  // data() {
  //   return {
  //     posts: [
  //       {
  //         title: 'A New beging',
  //         previewText: 'This is damn one post',
  //         thumbnailUrl:
  //           'https://www.healthyfood.co.uk/wp-content/uploads/2015/05/Chicken-in-a-bag-768x704.jpg',
  //         id: 'a-new-beginning'
  //       },
  //       {
  //         title: 'A Second beging',
  //         previewText: 'This is damn one post',
  //         thumbnailUrl:
  //           'https://www.healthyfood.co.uk/wp-content/uploads/2015/08/gnocchi-768x704.jpg',
  //         id: 'a-second-beginning'
  //       }
  //     ]
  //   }
  // }
}
</script>

<style>
#posts {
  padding: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 35rem) {
  #posts {
    flex-direction: row;
  }
}
</style>
