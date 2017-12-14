const createComment = (knex, comment) => knex('comments').insert(comment);

const createDiscussion = (knex, comments, discussion) => {
  return knex('discussions').insert(discussion, 'id')
    .then((uniqueDiscussionId) => {
      const commentPromises = [];

      comments.forEach((comment) => {
        commentPromises.push(createComment(knex, {
          id: comment.id,
          body: comment.body,
          discussionId: uniqueDiscussionId[0],
        }));
      });
      return Promise.all(commentPromises);
    })
    .catch(error => console.log(`Error in discussion: ${error}`));
};

const createTopicTag = (knex, topic) => {
  return knex('topicTags').insert({
    id: topic.id,
    tagTitle: topic.tagTitle,
  }, 'id')
    .then((topicTagId) => {
      const discussionPromises = [];

      topic.discussions.forEach((discussion) => {
        discussionPromises.push(createDiscussion(knex, discussion.comments, {
          id: discussion.id,
          title: discussion.title,
          body: discussion.body,
          tagId: topicTagId[0],
        }));
      });
      return Promise.all(discussionPromises);
    })
    .catch(error => console.log(`Error in topic: ${error}`));
};

exports.seed = (knex, Promise) => {
  return knex('comments').del()
    .then(() => knex('discussions').del())
    .then(() => knex('topicTags').del())
    .then(() => {
      const topicTagPromises = [];

      discussionsData.forEach((topic) => {
        topicTagPromises.push(createTopicTag(knex, topic));
      });
      return Promise.all(topicTagPromises);
    })
    .catch(error => console.error(`Error seeding data: ${error}`));
};

const discussionsData = [
  {
    id: 1,
    tagTitle: "6.RP.A.1",
    discussions: [
      {
        id: 1,
        title: "Unit Rate",
        body: "Didn't kids get this in Grade 5?",
        comments: [
          {
            id: 1,
            body: "Yes but it's important",
          },
          {
            id: 2,
            body: "Here is a link to the progression docs: LINK",
          },
        ],
      },
    ],
  },
];
