class ApplicationController < ActionController::Base
include Pagy::Backend
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
    def create_btchgwallet?
      if logged_in?
        user = current_user.id
         if Btchgwallet.find_by(user_id: user) == nil
           @btchgwallet = Btchgwallet.new(:user_id => user, :credit => 0.0, :debit => 0.0, :detail => "Wallet_Generated")
           @btchgwallet.save
         end
      end
    end
    def create_usdwallet?
      if logged_in?
        user = current_user.id
         if Usdwallet.find_by(user_id: user) == nil
           @usdwallet = Usdwallet.new(:user_id => user, :credit => 0.0, :debit => 0.0, :detail => "Wallet_Generated")
           @usdwallet.save
         end
      end
    end
    def btchg_balance
      if logged_in?
        @btchgwallets = current_user.btchgwallets
        balance = 0
        @btchgwallets.each do |btchgwallet|
          if btchgwallet.credit > 0 || btchgwallet.debit > 0
            balance =  balance + btchgwallet.credit.to_f
            balance =  balance - btchgwallet.debit.to_f
          else
            balance = balance + 0.0
          end
        end
        return balance
      end
    end
    def usd_balance
      if logged_in?
        @usdwallets = current_user.usdwallets
        balance = 0
        @usdwallets.each do |usdwallet|
          if usdwallet.credit > 0 || usdwallet.debit > 0
            balance =  balance + usdwallet.credit.to_f
            balance =  balance - usdwallet.debit.to_f
          else
            balance = balance + 0.0
          end
        end
        return balance
      end
    end
    def current_hedge_rate
      hgrate = Hedgerate.find_by(current: true)
      currentrate = hgrate.rate
      return currentrate
    end
    def create_referral(userid, referralid)
      userreferral = User.find_by(userid: referralid)
      referral = Rlvl.find_by(user_id: userreferral.id)
      user = Rlvl.new(:user_id => userid, :rlvlone => referralid, :rlvltwo => referral.rlvlone, :rlvlthree => referral.rlvltwo, :rlvlfour => referral.rlvlthree, :rlvlfive => referral.rlvlfour, :rlvlsix => referral.rlvlfive, :rlvlseven => referral.rlvlsix, :rlvleight => referral.rlvlseven, :rlvlnine => referral.rlvleight, :rlvlten => referral.rlvlnine)
      user.save
    end
    def send_sms(tomobile, message)
      require 'twilio-ruby'
        mobileno = "+" + tomobile.to_s
        account_sid = ""
        auth_token = ""
        @client = Twilio::REST::Client.new account_sid, auth_token
        message = @client.messages.create(
            body: message,
            to: mobileno,
            messaging_service_sid: ""
          )
        # puts message.sid
    end

end
