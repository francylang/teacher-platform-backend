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
          { id: 1,
            body: "Yes but it's important"
          },
          {
            id: 2,
            body: "Here is a link to the progression docs: LINK"
          }
        ]
      }
    ]
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
          { id: 3,
            body: "Learn Zillion!"
          },
        ]
      },
      {
        id: 3,
        title: "Double number line",
        body: "I get it, but I'm struggling to find the words to explain this without getting too procedural. Any tips?",
        comments: [
          { id: 4,
            body: "Here is a resource..."
          },
        ]
      }
    ]
  },
  {
    id: 3,
    tagTitle: "6.RP.A.3",
    discussions: [
      {
        id: 4,
        title: "Coodinate Plane",
        body: "Should students already know how to plot points on a coordinate plane?.",
        comments: [
          { id: 5,
            body: "They should know x is horizontal and y is vertical; be preapred for misconceptions about counting into negative integers."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    tagTitle: "6.RP.A.3.A",
    discussions: [
      {
        id: 5,
        title: "Percent",
        body: "I'm looking for great percent (with part, whole vocab) anchor charts - any pictures?",
        comments: [
          { id: 6,
            body: "Here you go!"
          },
          {
            id: 7,
            body: "Come by Stapleton!"
          },
        ]
      },
      {
        id: 6,
        title: "Measurement",
        body: "Specifically what units do we care about converting? Should students have ratios memorized, or can we assume they just need to understand how the two units compare and perform the conversion?",
        comments: [
          { id: 8,
            body: "We are having a PD on this next week - will post resources after"
          },
        ]
      },
    ]
  },
  {
    id: 5,
    tagTitle: "6.RP.A.3.B",
    discussions: [
      {
        id: 7,
        title: "Dividing Fractions",
        body: "Specifically what units do we care about converting? Should students have ratios memorized, or can we assume they just need to understand how the two units compare and perform the conversion?",
        comments: [
          { id: 9,
            body: "Yes but it's important"
          },
          {
            id: 10,
            body: "Here is a link to the progression docs: LINK"
          },
        ]
      },
    ]
  },
  {
    id: 6,
    tagTitle: "6.RP.A.3.C",
    discussions: [
      {
        id: 8,
        title: "GCF LCM Visuals",
        body: "Any great visuals for GCF and LCM?",
        comments: [
          { id: 11,
            body: "Yes but it's important"
          },
          {
            id: 12,
            body: "Here is a link to the progression docs: LINK"
          },
        ]
      },
    ]
  },
  {
    id: 7,
    tagTitle: "6.NS.A.1",
    discussions: [
      {
        id: 9,
        title: "Absolute Value",
        body: "What hands-on activities do you recommend for teaching this?",
        comments: [
          { id: 13,
            body: "I make a life size number line in the hallway"
          },
        ]
      },
    ]
  },
  {
    id: 8,
    tagTitle: "6.NS.B.2",
    discussions: [
      {
        id: 10,
        title: "Tasks",
        body: "Any great real-world tasks involving coordinate plane?",
        comments: [
          { id: 14,
            body: "Here you go!"
          },
        ]
      },
      {
        id: 11,
        title: "Variable - vocab",
        body: "Should students be using the term 'variables'? The standard says '... in which letters stand for numbers'.",
        comments: [
          { id: 15,
            body: "Definitely. You should model and have them use precise vocabulary at all times."
          },
        ]
      },
    ]
  },
  {
    id: 9,
    tagTitle: "6.NS.B.3",
    discussions: [
      {
        id: 12,
        title: "Subtract y from 5",
        body: "What kind of think-alouds or exploratory tasks, etc. can be done to help students see that 'subtract y from 5' = 5 - y and not y - 5? Thanks!",
        comments: [
          { id: 16,
            body: "Here is an anchor that helps with the language."
          },
        ]
      },
    ]
  },
  {
    id: 10,
    tagTitle: "6.NS.B.3",
    discussions: [
      {
        id: 13,
        title: "Vocab strategies",
        body: "Does anyone have a fun way of reinforcing vocabulary?",
        comments: [
          { id: 17,
            body: "It doesn't need to be fun."
          },
        ]
      },
    ]
  },
  {
    id: 11,
    tagTitle: "6.NS.B.4",
    discussions: [
      {
        id: 14,
        title: "Factoring out of Distributive Property",
        body: "How do you teach kids to factor out an expression such as 24x + 18? I can 'drill and kill' a procedure, but I'd love to teach it in a better way.",
        comments: [
          { id: 18,
            body: "What do they have in common?"
          },
        ]
      },
    ]
  },
  {
    id: 12,
    tagTitle: "6.NS.C.5",
    discussions: [
      {
        id: 15,
        title: "Equations?",
        body: "How many step - equations should we have them solve?",
        comments: [
          { id: 19,
            body: "one and two"
          },
        ]
      },
    ]
  },
  {
    id: 13,
    tagTitle: "6.NS.C.6",
    discussions: [
      {
        id: 16,
        title: "Dependent/Independent",
        body: "How can we collaborate with the science team to reinforce dependent/independent variables?",
        comments: [
          { id: 20,
            body: "Great question - here is their pacing guide"
          },
        ]
      },
      {
        id: 17,
        title: "ELL - vocab",
        body: "This is especially difficult for my students who are ELLs. ANy strategies to help them?",
        comments: []
      },
    ]
  },
  {
    id: 14,
    tagTitle: "6.NS.C.6.A",
    discussions: [
      {
        id: 18,
        title: "Dependent/Independent",
        body: "How can we collaborate with the science team to reinforce dependent/independent variables?",
        comments: [
          { id: 21,
            body: "Great question - here is their pacing guide"
          },
        ]
      },
    ]
  },
  {
    id: 15,
    tagTitle: "6.NS.C.6.B",
    discussions: [
      {
        id: 19,
        title: "Variables",
        body: "How do you represent variables with algeblocks?",
        comments: [
          { id: 22,
            body: "here's a great resource!"
          },
        ]
      },
    ]
  },
  {
    id: 16,
    tagTitle: "6.NS.C.6.C",
    discussions: [
      {
        id: 20,
        title: "This is completely made up",
        body: "BAHHHHHH",
        comments: [
          { id: 23,
            body: "Here you go!"
          },
        ]
      },
    ]
  },
  {
    id: 17,
    tagTitle: "6.NS.C.7",
    discussions: [
      {
        id: 21,
        title: "3D Nets",
        body: "I know this isn't a prioritized standard, but would love to do this on a culture day - any fun activities out there?",
        comments: [
          { id: 24,
            body: "YES! Here is a super fun activity."
          },
        ]
      },
    ]
  },
  {
    id: 18,
    tagTitle: "6.NS.C.7.A",
    discussions: [
      {
        id: 22,
        title: "Data - overall shape",
        body: "How far should we go into 'overall shape'?",
        comments: [
          { id: 25,
            body: "Students should be able to identify trends and patterns."
          },
          { id: 26,
            body: "I would want students to say something like 'By the shape of the data, I can see that most students have a cell phone.'"
          },
        ]
      },
    ]
  },
  {
    id: 19,
    tagTitle: "6.NS.C.7.B",
    discussions: [
      {
        id: 23,
        title: "Central Tend - Graphic Organizers",
        body: "Any good graphic organizers for all the measures of central tendency?",
        comments: [
          { id: 27,
            body: "See attached."
          },
        ]
      },
    ]
  },
  {
    id: 20,
    tagTitle: "6.NS.C.7.B",
    discussions: [
      {
        id: 24,
        title: "Which data display to prioritize?",
        body: "I only have time to cover two: dot, histogram, or box plots? What's more importnat for 7th-8th?",
        comments: [
          { id: 28,
            body: "I would NOT prioritize box plots"
          },
        ]
      },
    ]
  },
  {
    id: 21,
    tagTitle: "6.NS.C.7.C",
    discussions: [
      {
        id: 25,
        title: "Anchor charts",
        body: "Who has great anchor charts I can borrow ideas from? I'm not creative!",
        comments: [
          { id: 29,
            body: "Here are some pics!"
          },
        ]
      },
    ]
  },
  {
    id: 22,
    tagTitle: "6.NS.C.7.D",
    discussions: [
      {
        id: 26,
        title: "Curriculum order",
        body: "Does it make sense to teach RP standars before NS?",
        comments: [
          { id: 30,
            body: "Big topic of discussion in the math community - here are some articles to read up on. Each campus can do whichever they believe is best."
          },
        ]
      },
    ]
  },
  {
    id: 23,
    tagTitle: "6.NS.C.8",
    discussions: [
      {
        id: 27,
        title: "Fluency",
        body: "Does anyone have any great fluency activities?",
        comments: [
          { id: 31,
            body: "Here you go"
          },
        ]
      },
    ]
  },
  {
    id: 24,
    tagTitle: "6.NS.EE.A.1",
    discussions: [
      {
        id: 28,
        title: "Fluency",
        body: "Does anyone have any great fluency activities?",
        comments: []
      },
    ]
  },
  {
    id: 25,
    tagTitle: "6.EE.A.2",
    discussions: [
      {
        id: 29,
        title: "Packet format?",
        body: "How do you format your packets? Looking for something I can use daily - consistent and quick.",
        comments: [
          { id: 32,
            body: "Here you go"
          },
        ]
      },
    ]
  },
  {
    id: 26,
    tagTitle: "6.EE.A.2.A",
    discussions: [
      {
        id: 30,
        title: "Packet content",
        body: "What all do you print in your packet? If I print too much, the kids work ahead. Ideas?",
        comments: [
          { id: 33,
            body: "Here you go"
          },
        ]
      },
    ]
  },
  {
    id: 27,
    tagTitle: "6.EE.A.2.B",
    discussions: [
      {
        id: 31,
        title: "Grading DN",
        body: "Do you grade Do Nows?",
        comments: [
          { id: 34,
            body: "Yes, this helps hold kids accountable to completing it. Attached are some strategies."
          },
        ]
      },
    ]
  },
  {
    id: 28,
    tagTitle: "6.EE.A.2.C",
    discussions: [
      {
        id: 32,
        title: "Trade and Grade",
        body: "Any trade and grade strategies? I would love to see a video of the executiong.",
        comments: [
          { id: 35,
            body: "Blahblahlbahlblhablah."
          },
        ]
      },
    ]
  },
  {
    id: 29,
    tagTitle: "6.EE.A.3",
    discussions: [
      {
        id: 33,
        title: "Precise Language",
        body: "How are teachers getting students to use precise mathematical vocab?",
        comments: [
          { id: 36,
            body: "Blahblahlbahlblhablah."
          },
        ]
      },
    ]
  },
  {
    id: 30,
    tagTitle: "6.EE.A.4",
    discussions: [
      {
        id: 34,
        title: "Partners",
        body: "How do you pair kids up? I'm noticing that students farther along are steamrolling kids who need to be supported by that peer.",
        comments: []
      },
    ]
  },
];
