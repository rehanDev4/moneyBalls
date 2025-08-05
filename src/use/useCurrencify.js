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
           ammountFormated = ammountPossitive.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');


  return `${posNegSymbol} ${currencySymbol} ${ammountFormated}`;
}
