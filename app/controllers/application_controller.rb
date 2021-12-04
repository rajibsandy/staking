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
    def create_stakewallet?
      if logged_in?
        user = current_user.id
         if Stakewallet.find_by(user_id: user) == nil
           @stakewallet = Stakewallet.new(:user_id => user, :credit => 0.0, :debit => 0.0, :detail => "Wallet_Generated")
           @stakewallet.save
         end
      end
    end
    def stake_balance
      if logged_in?
        @stakewallets = current_user.stakewallet
        balance = 0
        @stakewallets.each do |stakewallet|
          if stakewallet.credit > 0 || stakewallet.debit > 0
            balance =  balance + stakewallet.credit.to_f
            balance =  balance - stakewallet.debit.to_f
          else
            balance = balance + 0.0
          end
        end
        return balance
      end
    end
end
