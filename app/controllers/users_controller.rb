class UsersController < ApplicationController
    def new
        user = User.new
    end
    def create
      params[:user][:boot_active] = false
      params[:user][:kyc] = false
      if params[:user][:referral] == ""
        params[:user][:referral] == "BHD0001"
        user = User.new(user_params)
            if user.save
              session[:user_id] = user.id
              if session[:user_id]
                flash[:notice] = "Welcome to Bitcoin Hedge #{user.name}! You have successfully signed up!"
                create_referral(user.id, params[:user][:referral])
                create_btchgwallet?
                create_usdwallet?
                userid = "BHD000" + user.id.to_s
                user.update(userid: userid)
                render json: {success: true}
              end

            else
              if user.errors.messages[:name].present?
                  render json: { status: 'error', message: "Name " + user.errors.messages[:name][0] }, status: :unprocessable_entity
              elsif user.errors.messages[:email].present?
                  render json: { status: 'error', message: "Email " + user.errors.messages[:email][0] }, status: :unprocessable_entity
              elsif user.errors.messages[:password].present?
                  render json: { status: 'error', message: "Password " + user.errors.messages[:password][0] }, status: :unprocessable_entity
              else
                render json: { status: 'error', message: "Something wen't wrong" }, status: :unprocessable_entity
              end
            end
      else
        referraluser = User.find_by(userid: params[:user][:referral])
        if referraluser == nil
          render json: { status: 'error', message: "Invalid referral id!" }, status: :unprocessable_entity
        else
          user = User.new(user_params)
          if user.save
            session[:user_id] = user.id
            if session[:user_id]
              flash[:notice] = "Welcome to Bitcoin Hedge #{user.name}! You have successfully signed up!"
              create_referral(user.id, params[:user][:referral])
              create_btchgwallet?
              create_usdwallet?
              userid = "BHD000" + user.id.to_s
              user.update(userid: userid)
              render json: {success: true}
            end

          else
            if user.errors.messages[:name].present?
                render json: { status: 'error', message: "Name " + user.errors.messages[:name][0] }, status: :unprocessable_entity
            elsif user.errors.messages[:email].present?
                render json: { status: 'error', message: "Email " + user.errors.messages[:email][0] }, status: :unprocessable_entity
            elsif user.errors.messages[:password].present?
                render json: { status: 'error', message: "Password " + user.errors.messages[:password][0] }, status: :unprocessable_entity
            else
              render json: { status: 'error', message: "Something wen't wrong" }, status: :unprocessable_entity
            end
          end
        end
      end
    end

    def user_btchg_balance
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
        render json: { balance: balance }
      end
    end

    def user_usd_balance
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
        render json: { balance: balance }
      end
    end
    def current_hedge_rate
      hgrate = Hedgerate.find_by(current: true)
      currentrate = hgrate.rate
      render json: { currentrate: currentrate }
    end

    def details
      render json: { user: current_user }
    end
    def sendotp
      user = current_user
      code = rand(10000000)
      message = "Your BITCOIN HEDGE Verification code is: " + code.to_s
      send_sms(user.mobileno, message)
      user.update(checking: code)
    end
    def user_profile_mobile
      if params[:profile][:otp].to_s == current_user.checking.to_s
        new = Time.now
        user = current_user
        user.update(mobile_verified_at: new)
        message = "Dear #{current_user.name} your mobile no is verified successfully! -BITCOINHEDGE"
        send_sms(current_user.mobileno, message)
      else
      end
    end
    def referral
      referraluser = User.find_by(userid: params[:user][:referral])
      if referraluser == nil
        render json: { status: 'error', message: "Invalid Referral id" }, status: :unprocessable_entity
      else
        render json: { referral: referraluser }
      end

    end
    def save_bank
      user = current_user
      if params[:profile][:bank_accountno] != nil && params[:profile][:bank_ifsccode] != nil && params[:profile][:bank_upi] != nil && params[:profile][:btcaddress] != nil
        user.update(bank_accountno: params[:profile][:bank_accountno].to_s, bank_ifsccode: params[:profile][:bank_ifsccode].to_s, bank_upi: params[:profile][:bank_upi].to_s, btcaddress: params[:profile][:btcaddress].to_s)
      elsif params[:profile][:bank_accountno] != nil && params[:profile][:bank_ifsccode] != nil && params[:profile][:bank_upi] != nil
          user.update(bank_accountno: params[:profile][:bank_accountno].to_s, bank_ifsccode: params[:profile][:bank_ifsccode].to_s, bank_upi: params[:profile][:bank_upi].to_s)
      elsif params[:profile][:bank_accountno] != nil && params[:profile][:bank_ifsccode] != nil && params[:profile][:btcaddress] != nil
          user.update(bank_accountno: params[:profile][:bank_accountno].to_s, bank_ifsccode: params[:profile][:bank_ifsccode].to_s, btcaddress: params[:profile][:btcaddress].to_s)
      elsif params[:profile][:bank_accountno] != nil && params[:profile][:bank_ifsccode] != nil
        user.update(bank_accountno: params[:profile][:bank_accountno].to_s, bank_ifsccode: params[:profile][:bank_ifsccode].to_s)
      elsif params[:profile][:bank_upi] != nil
        user.update(bank_upi: params[:profile][:bank_upi].to_s)
      elsif params[:profile][:btcaddress] != nil
        user.update(btcaddress: params[:profile][:btcaddress].to_s)
      else
        render json: { status: 'error', message: "Kindly fill your banking details properly!" }, status: :unprocessable_entity
      end
    end
    def user_profile
      user = current_user
      user.update(mobileno: params[:profile][:mobileno], mobile_verified_at: nil)
    end
    def kyc_upload
      idproof = Cloudinary::Uploader.upload(params[:idproof], :folder => "Idproof/")
      addressproof = Cloudinary::Uploader.upload(params[:addressproof], :folder => "addressproof/")
      bank_passbook = Cloudinary::Uploader.upload(params[:bank_passbook], :folder => "bankpassbook/")
      user = current_user
      user.update(idproof: idproof["url"], addressproof: addressproof["url"], bank_passbook: bank_passbook["url"])
    end
    private
    def user_params
        params.require(:user).permit(:referral, :name, :email, :password, :mobileno, :boot_active, :kyc)
    end
end
