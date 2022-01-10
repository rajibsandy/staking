class SessionsController < ApplicationController
    def new
    end

    def create
        user = User.find_by(email: params[:login][:email].downcase)
        if user && user.authenticate(params[:login][:password])
            session[:user_id] = user.id
            if session[:user_id]
              render json: {success: true}
            end
        else
            render json: { status: 'error', message: 'Credentials does not match our records!' }, status: :unprocessable_entity
        end
    end

    def destroy
        session[:user_id] = nil
        flash[:notice] = "Logged out successfully"
        redirect_to login_path
    end
end
