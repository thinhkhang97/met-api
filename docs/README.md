![Logo](https://github.com/thinhkhang97/lunch-together-api/blob/meet/docs/logos/logo-color.png?raw=true)

# Met

A platform to create a meeting and provide utilities for team such as creating a meal, planing, deep dive.

## Features (MVP)

- Identity
- Group management
- Meeting with team for a planing tasks

### Identity

Manage user account with features:

#### Register

Allow user register an account by provide email and password.

Each user can only be registered by one email, if user intentionally register with the exist email,
they will get the error

In this MVP stage, we don't verify the email.

#### Login

Allow user login to the platform by their email and password.
They also get the error if the email and password provided are wrong.

#### Search user

A user can find another user information by their email.

### Group

After the first time user has just logged in, the web application will prompt
a popup for user to create a group. They can skip this step and move on to the
list groups they are in.

A group has a name, it should be unique. When a group created, it also has several roles at the same time,
the basic roles are OWNER and MEMBER, only group owner can add more roles. Because this is MVP, so we haven't
supported adding more roles yet, in the future, a group can create more role as demand of business.

A group certainly has some members, a member in the group has their own name and one role, and it should be distinction
with other member. Only the group owner can add a new member into the group. The group owner also has ability to remove
a member out of the group. In the next version, we may have more features to manage group better.

#### View groups

List of group the user attended, if there is not any group at all, it will be
an empty state UI with the "Create a group" button there.

#### Create group

Create a new group with group name, the group name should be unique.
The user performs creating group action is going be the first member with role is group owner of group.
And as mentioned above, there are several roles created at this time.

#### Add a user into group

A group owner can search a user and add their into the group.
Like any member, a new member should provide their name in group, and it must be unique in the group.

#### Remove a user

A group owner can remove a member out of their group

### Meeting

A meeting is a session that every member in a group can be together to do a specific action like deep dive, planing,
etc.
For the MVP, we already have planing meeting type, other types is coming soon.

#### Create a planing meeting

A planing meeting is a session in which every single member in a team will give their opinions about the tasks in a
sprint. Every member in a group can create a planing meeting by creating a meeting by providing title, description and
choose planing type.

#### Add more member into a meeting

Any attended member can add other members in their group into the meeting. There should be a place to show the list of
members in the meeting

#### Remove member

Any attended member can remove a member out of the meeting

#### Add a task for planing or deep dive

Any member in the meeting can add a task for deep dive or planing, a task should have title and description

#### Remove task for the planing

Any member can remove a task out of the meeting

#### Vote for a task

Before voting, at anytime, a member can switch between two role that are VOTER and SUPER VISOR. A voter can give their
value for a task, otherwise supervisors just watch what will happen.

When a member start a vote session for a task, everyone in the meeting will be put into the session. The voters have
some values which might be cards or something to pick. The voter can pick one value or not, the picked value is secret
and no one can know it. After a while, any member can stop the vote and show all the values. The estimation value is
calculated by the average values of voters

#### View meeting history

There will be a place to view all the meeting history, including members, tasks and vote in the planing meeting.

