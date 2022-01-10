module Api
  module V1
    class PeersController < ApplicationController
      def approveproof
        proof = Proofupload.find(params[:id])
        buyerrequest = proof.buyer_request
        buyeruser = buyerrequest.user.id
        sellerrequest = buyerrequest.seller_request
        proof.update(confirmation: true, open: false)
        buyerrequest.update(open: false)
        newamount = sellerrequest.amount.to_f - buyerrequest.amount.to_f
        if newamount > 0
          sellerrequest.update(amount: newamount, busy: false)
          credit = Usdwallet.new(:user_id => buyerrequest.user_id, :credit => buyerrequest.amount.to_f, :debit => 0.0, :detail => "Credited_from_ptop_from_BHD000#{sellerrequest.user_id}")
          if credit.save

            user = buyerrequest.user
            user.update(seller_review: true)
            message = "Dear #{buyerrequest.name}, #{buyerrequest.amount} USDT received to your account from BHD000#{sellerrequest.user_id} -BITCOINHEDGE"
            send_sms(user.mobileno, message)
          end
        else
          sellerrequest.update(amount: newamount, busy: false, open: false)
          credit = Usdwallet.new(:user_id => buyerrequest.user_id, :credit => buyerrequest.amount.to_f, :debit => 0.0, :detail => "Credited_from_ptop_from_BHD000#{sellerrequest.user_id}")
          if credit.save
            user = buyerrequest.user
            user.update(seller_review: true)
            message = "Dear #{buyerrequest.name}, #{buyerrequest.amount} USDT received to your account from BHD000#{sellerrequest.user_id} -BITCOINHEDGE"
            send_sms(user.mobileno, message)
          end
        end
      end
      def rejectproof
        proof = Proofupload.find(params[:id])
        buyerrequest = proof.buyer_request
        sellerrequest = buyerrequest.seller_request
        proof.update(admin_check: true)
        buyerrequest.update(admin_check: true)
        user = buyerrequest.user
        message = "Dear #{buyerrequest.user.name}, your request for #{buyerrequest.amount} USDT has rejected by seller and sent to admin kindly wait for admin to confirm."
        send_sms(user.mobileno, message)
      end
    end
  end
end
