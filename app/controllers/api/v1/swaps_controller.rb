module Api
    module V1
          class SwapsController < ApplicationController
            def create
              if params[:swap][:option] == "usdtobtchg"
                if params[:swap][:amount].to_f <= usd_balance.to_f
                  hedgerate = Hedgerate.find_by(current: true)
                  btchg = params[:swap][:amount].to_f / hedgerate.rate
                  debit = Usdwallet.new(:user_id => current_user.id, :credit => 0.0, :debit => params[:swap][:amount].to_f, :detail => "Debited_for_swap")
                  debit.save
                  credit = Btchgwallet.new(:user_id => current_user.id, :credit => btchg, :debit => 0.0, :detail => "Credited_for_swap")
                  credit.save
                else
                  render json: { status: 'error', message: "Not enough balance!" }, status: :unprocessable_entity
                end
              else
                if params[:swap][:amount].to_f <= btchg_balance.to_f
                  hedgerate = Hedgerate.find_by(current: true)
                  usd = hedgerate.rate * params[:swap][:amount].to_f
                  credit = Usdwallet.new(:user_id => current_user.id, :credit => usd, :debit => 0.0, :detail => "Credited_for_swap")
                  credit.save
                  debit = Btchgwallet.new(:user_id => current_user.id, :credit => 0.0, :debit => params[:swap][:amount].to_f, :detail => "Debited_for_swap")
                  debit.save
                else
                  render json: { status: 'error', message: "Not enough balance!" }, status: :unprocessable_entity
                end
              end
            end
          end
    end
end
