class Stakewithdrawal < ApplicationRecord
   belongs_to :stake


   def auto_stakewithdrawal

     @stakes = Stake.all
     @stakes.each do |stake|
       if stake.status == 1
         current = DateTime.now
         difference = (current.year * 12 + current.month) - (stake.updated_at.year * 12 + stake.updated_at.month)
         if difference == 1
           if stake.withdrawal.to_i < 11
           calusd = stake.usd.to_f * 0.05
           amount = calusd / 125
           @stakewithdrawal = Stakewithdrawal.new(:user_id => stake.user_id, :stake_id => stake.id, :monthly => true,:amount => amount,:usd => calusd,:status => 1)
             if @stakewithdrawal.save
                 @stakewallet = Stakewallet.new(:user_id => current_user.id, :credit => amount, :debit => 0.0, :detail => "Staking_Withdrawal_Monthly")
                 @stakewallet.save
                 withdrawalcount = stake.withdrawal.to_i + 1
                 stake.update(withdrawal: withdrawalcount)
             end
           else
             calusd = stake.usd.to_f * 0.05
             amount = calusd / 125
             @stakewithdrawal = Stakewithdrawal.new(:user_id => stake.user_id, :stake_id => stake.id, :monthly => true,:amount => amount,:usd => calusd,:status => 1)
             if @stakewithdrawal.save
                 @stakewithdrawalr = Stakewithdrawal.new(:user_id => stake.user_id, :stake_id => stake.id, :monthly => false,:amount => amount,:usd => calusd,:status => 1)
                 @stakewithdrawalr.save
                 @stakewallet = Stakewallet.new(:user_id => stake.user_id, :credit => amount, :debit => 0.0, :detail => "Staking_Withdrawal_Monthly")
                 @stakewallet.save
                 withdrawalcount = stake.withdrawal.to_i + 1
                 stake.update(withdrawal: withdrawalcount)
                 stake.update(status: 3)
                 @stakewallet = Stakewallet.new(:user_id => stake.user_id, :credit => stake.amount, :debit => 0.0, :detail => "Staking_Realesed")
                 @stakewallet.save
             end
           end
         end
       end
     end
     puts "Auto Stakewithdrawal Completed!"
   end
end
