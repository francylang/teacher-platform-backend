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
        body: "Didn't kids get this in Grade 5? I'm confused about why it's in the standards.",
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
  {
    id: 2,
    tagTitle: "6.RP.A.2",
    discussions: [
      {
        id: 2,
        title: "Tape Diagrams",
        body: "I'm having a hard time grasping tape diagrams well enough to teach kids how to use them as a tool. Any resources?",
        comments: [
          {
            id: 3,
            body: "Learn Zillion!",
          },
        ],
      },
      {
        id: 3,
        title: "Double number line",
        body: "I get it, but I'm struggling to find the words to explain this without getting too procedural. Any tips?",
        comments: [
          {
            id: 4,
            body: "Here is a resource...",
          },
        ],
      },
    ],
  },
];
