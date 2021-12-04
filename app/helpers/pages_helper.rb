module PagesHelper
  def stake_balance
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
    balance = sprintf "%.8f",balance
    return balance
  end
end
