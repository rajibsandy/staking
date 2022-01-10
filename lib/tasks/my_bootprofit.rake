namespace :my_bootprofit do
  desc "TODO"
  task auto_bootprofit: :environment do
    puts "Auto BootProfit Started..."
    currentt = Time.now.utc
    require 'json'
    require 'httparty'
      @boots = Boot.all
      @boots.each do |boot|
        if boot.open == true
          user = User.find(boot.user_id)# user
          bootplan = Bootplan.find(user.boot_plan) #plan
          userLastBootprofit = user.bootprofits.last
          if userLastBootprofit == nil
            current = Time.now.utc
            if (current - user.boot.created_at).seconds.in_hours.to_i >= 24
              url = 'https://www.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
              response = HTTParty.get(url)
              @data = response.parsed_response
              profit = (((@data["price"].to_f - user.boot.btcrate.to_f) * user.boot.amount.to_f) / 2) - user.boot.fees.to_f
              if profit > 0
                usdwallet = Usdwallet.new(:user_id => user.id, :credit => profit.to_f, :debit => 0.0, :detail => "Credited_Bot_trading_profit")
                usdwallet.save
                bootprofit = Bootprofit.new(:user_id => user.id, :profit => profit.to_f, :rate => user.boot.btcrate.to_f , :amount => user.boot.amount.to_f, :detail => "Profit Credited")
                bootprofit.save
                usd = user.boot.btcrate.to_f * user.boot.amount.to_f
                amount = usd.to_f / @data["price"].to_f
                user.boot.update(btcrate: @data["price"].to_f, amount: amount)
              else
                usd = user.boot.btcrate.to_f * user.boot.amount.to_f
                amount = usd.to_f / @data["price"].to_f
                user.boot.update(btcrate: @data["price"].to_f, amount: amount)
              end
            end
          else

            current = Time.now.utc
            difference = (current.year * 12 + current.month) - (user.boot_subscription.year * 12 + user.boot_subscription.month)
            userbootplan = Bootplan.find(user.boot_plan)
            if difference >= userbootplan.months.to_i
              if (current - user.boot.updated_at).seconds.in_hours.to_i >= 24
                url = 'https://www.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
                response = HTTParty.get(url)
                @data = response.parsed_response
                profit = (((@data["price"].to_f - user.boot.btcrate.to_f) * user.boot.amount.to_f) / 2) - user.boot.fees.to_f
                return @data
                if profit > 0
                  usdwallet = Usdwallet.new(:user_id => user.id, :credit => profit.to_f, :debit => 0.0, :detail => "Credited_Bot_trading_profit")
                  usdwallet.save
                  bootprofit = Bootprofit.new(:user_id => user.id, :profit => profit.to_f, :rate => user.boot.btcrate.to_f , :amount => user.boot.amount.to_f, :detail => "Profit Credited")
                  bootprofit.save
                  usd = user.boot.btcrate.to_f * user.boot.amount.to_f
                  amount = usd.to_f / @data["price"].to_f
                  user.boot.update(btcrate: @data["price"].to_f, amount: amount)
                else
                  usd = user.boot.btcrate.to_f * user.boot.amount.to_f
                  amount = usd.to_f / @data["price"].to_f

                  user.boot.update(btcrate: 0, amount: 0, open: false)
                end
              end
                user.update(boot_subscription: nil, boot_plan: nil, boot_active: false)
            else

              if (current - user.boot.updated_at).seconds.in_hours.to_i >= 24
                url = 'https://www.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
                response = HTTParty.get(url)
                @data = response.parsed_response
                profit = (((@data["price"].to_f - user.boot.btcrate.to_f) * user.boot.amount.to_f) / 2) - user.boot.fees.to_f
                if profit > 0
                  usdwallet = Usdwallet.new(:user_id => user.id, :credit => profit.to_f, :debit => 0.0, :detail => "Credited_Bot_trading_profit")
                  usdwallet.save
                  bootprofit = Bootprofit.new(:user_id => user.id, :profit => profit.to_f, :rate => user.boot.btcrate.to_f , :amount => user.boot.amount.to_f, :detail => "Profit Credited")
                  bootprofit.save
                  usd = user.boot.btcrate.to_f * user.boot.amount.to_f
                  amount = usd.to_f / @data["price"].to_f
                  user.boot.update(btcrate: @data["price"].to_f, amount: amount)
                else
                  usd = user.boot.btcrate.to_f * user.boot.amount.to_f
                  amount = usd.to_f / @data["price"].to_f
                  user.boot.update(btcrate: @data["price"].to_f, amount: amount)
                end
              end
            end
          end
        end
      end
    puts "Auto BootProfit Completed!" + currentt.to_s
  end

end
