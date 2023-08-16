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
with other
member. Only the group owner can add a new member into the group. The group owner also has ability to remove a member
out of the
group. In the next version, we may have more features to manage group better.

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
