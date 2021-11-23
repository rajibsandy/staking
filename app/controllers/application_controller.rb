class ApplicationController < ActionController::Base
    def current_user
        if session[:user_id]
            @current_user ||= User.find(session[:user_id])
        end
    end
    def logged_in?
        !!current_user
    end
    def require_user
        if !logged_in?
            flash[:alert] = "You must be logged in to perform any action!"
            redirect_to login_path
        end
    end
end
