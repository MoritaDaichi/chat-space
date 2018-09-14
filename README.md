# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|primary_key: true|
|name|string|null:false,unique:true|
|mail|string|null:false,unique:true|


### Asosiation
- has_many :messages
- has_many :groups_users
- has_many :groups, through:groups_users


##  groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|primary_key: true|
|title|string|null: false|

### Asosiation
- has_many :messages
- has_many :groups_users
- has_many :users, through:groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|foreign_key: true, null: false|
|user_id|integer|foreign_key: true, null: false|

### Asosiation
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|Option|
|------|----|------|
|group_id|integer|primary_key: true, foreign_key: true|
|user_id|integer|primary_key: true, foreign_key: true|
|body|text|null: false|
|image|string|null: true|

### Asosiation
- belongs_to :group
- belongs_to :user


* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
