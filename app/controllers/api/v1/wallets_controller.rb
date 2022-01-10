module Api
    module V1
        class WalletsController < ApplicationController
            def usdwallets
              data = current_user.usdwallets.paginate(page: params[:page], per_page: 10).order('created_at DESC')
              render json: {main: data, pages: data.total_pages}
            end
            def btchgwallets
              data = current_user.btchgwallets.paginate(page: params[:page], per_page: 10).order('created_at DESC')
              render json: {main: data, pages: data.total_pages}
            end
        end
    end
end
