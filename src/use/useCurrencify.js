//currencify
export function usecurrencify(amount) {


    let posNegSymbol = '';
    if(amount < 0) {
      posNegSymbol = '-';
    } else if(amount > 0){
      posNegSymbol = '+'
    }
    const currencySymbol = '$',
           ammountPossitive = Math.abs(amount),
           ammountFormated = ammountPossitive.toLocaleString('en-US', {
             minimumFractionDigits: 2,
             maximumFractionDigits: 2
           });


  return `${posNegSymbol} ${currencySymbol} ${ammountFormated}`;
}
