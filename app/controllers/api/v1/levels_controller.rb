module Api
  module V1
    class LevelsController < ApplicationController

      def levelone
        require 'will_paginate/array'# items per page
        hash_arr = []
        lvlones = Rlvl.where(rlvlone: current_user.userid)
        lvlones.each do |lvlone|
          user = User.find_by(id: lvlone.user_id)
          hash = {id: user.id, attributes:{:name => user.name, :userid => user.userid, :email => user.email, :created_at => user.created_at}}
          hash_arr.push(hash)
        end
        data = hash_arr.paginate(page: params[:page], per_page: 10)
        render json: { main:  {data: data}, pages: data.total_pages}
      end
      def leveltwo
        require 'will_paginate/array'# items per page
        hash_arr = []
        lvltwos = Rlvl.where(rlvltwo: current_user.userid)
        lvltwos.each do |lvltwo|
          user = User.find_by(id: lvltwo.user_id)
          hash = {id: user.id, attributes:{:name => user.name, :userid => user.userid, :email => user.email, :created_at => user.created_at}}
          hash_arr.push(hash)
        end
        data = hash_arr.paginate(page: params[:page], per_page: 10)
          render json: { main:  {data: data}, pages: data.total_pages}
      end
      def levelthree
        require 'will_paginate/array'# items per page
        hash_arr = []
        lvlthrees = Rlvl.where(rlvlthree: current_user.userid)
        lvlthrees.each do |lvlthree|
          user = User.find_by(id: lvlthree.user_id)
          hash = {id: user.id, attributes:{:name => user.name, :userid => user.userid, :email => user.email, :created_at => user.created_at}}
          hash_arr.push(hash)
        end
        data = hash_arr.paginate(page: params[:page], per_page: 10)
        render json: { main:  {data: data}, pages: data.total_pages}
      end
      def levelfour
        require 'will_paginate/array'# items per page
        hash_arr = []
        lvlfours = Rlvl.where(rlvlfour: current_user.userid)
        lvlfours.each do |lvlfour|
          user = User.find_by(id: lvlfour.user_id)
          hash = {id: user.id, attributes:{:name => user.name, :userid => user.userid, :email => user.email, :created_at => user.created_at}}
          hash_arr.push(hash)
        end
        data = hash_arr.paginate(page: params[:page], per_page: 10)
          render json: { main:  {data: data}, pages: data.total_pages}
      end
      def levelfive
        require 'will_paginate/array'# items per page
        hash_arr = []
        lvlfives = Rlvl.where(rlvlfive: current_user.userid)
        lvlfives.each do |lvlfive|
          user = User.find_by(id: lvlfive.user_id)
          hash = {id: user.id, attributes:{:name => user.name, :userid => user.userid, :email => user.email, :created_at => user.created_at}}
          hash_arr.push(hash)
        end
        data = hash_arr.paginate(page: params[:page], per_page: 10)
        render json: { main:  {data: data}, pages: data.total_pages}
      end
      def levelsix
        require 'will_paginate/array'# items per page
        hash_arr = []
        lvlsixs = Rlvl.where(rlvlsix: current_user.userid)
        lvlsixs.each do |lvlsix|
          user = User.find_by(id: lvlsix.user_id)
          hash = {id: user.id, attributes:{:name => user.name, :userid => user.userid, :email => user.email, :created_at => user.created_at}}
          hash_arr.push(hash)
        end
        data = hash_arr.paginate(page: params[:page], per_page: 10)
        render json: { main:  {data: data}, pages: data.total_pages}
      end
      def levelseven
        require 'will_paginate/array'# items per page
        hash_arr = []
        lvlsevens = Rlvl.where(rlvlseven: current_user.userid)
        lvlsevens.each do |lvlseven|
          user = User.find_by(id: lvlseven.user_id)
          hash = {id: user.id, attributes:{:name => user.name, :userid => user.userid, :email => user.email, :created_at => user.created_at}}
          hash_arr.push(hash)
        end
        data = hash_arr.paginate(page: params[:page], per_page: 10)
        render json: { main:  {data: data}, pages: data.total_pages}
      end
      def leveleight
        require 'will_paginate/array'# items per page
        hash_arr = []
        lvleights = Rlvl.where(rlvleight: current_user.userid)
        lvleights.each do |lvleight|
          user = User.find_by(id: lvleight.user_id)
          hash = {id: user.id, attributes:{:name => user.name, :userid => user.userid, :email => user.email, :created_at => user.created_at}}
          hash_arr.push(hash)
        end
        data = hash_arr.paginate(page: params[:page], per_page: 10)
        render json: { main:  {data: data}, pages: data.total_pages}
      end
      def levelnine
        require 'will_paginate/array'# items per page
        hash_arr = []
        lvlnines = Rlvl.where(rlvlnine: current_user.userid)
        lvlnines.each do |lvlnine|
          user = User.find_by(id: lvlnine.user_id)
          hash = {id: user.id, attributes:{:name => user.name, :userid => user.userid, :email => user.email, :created_at => user.created_at}}
          hash_arr.push(hash)
        end
        data = hash_arr.paginate(page: params[:page], per_page: 10)
        render json: { main:  {data: data}, pages: data.total_pages}
      end
      def levelten
        require 'will_paginate/array'# items per page
        hash_arr = []
        lvltens = Rlvl.where(rlvlten: current_user.userid)
        lvltens.each do |lvlten|
          user = User.find_by(id: lvlten.user_id)
          hash = {id: user.id, attributes:{:name => user.name, :userid => user.userid, :email => user.email, :created_at => user.created_at}}
          hash_arr.push(hash)
        end
        data = hash_arr.paginate(page: params[:page], per_page: 10)
        render json: { main:  {data: data}, pages: data.total_pages}
      end
    end
  end
end
