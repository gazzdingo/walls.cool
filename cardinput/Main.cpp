  #include <iostream>
  #include <string>

  std::string cardDetails;
  std::string cardNumber;
  std::string cardLastName;
  std::string cardFirstName;
  std::string cardMonth;
  std::string cardYear;

  void readCard() {
      char lastChar;
      int count = 0;
      do {
        std::string currentInput;
        std::cin >> currentInput;
        if(count > 0) {
          cardDetails += ' ';
        }
        cardDetails += currentInput;
        if (!cardDetails.empty())
        {
            lastChar = *cardDetails.rbegin();
        }
        count++;
      } while(lastChar != '?');
      if(cardDetails.at(0) == '%') {
        int currentInputType = 0;
        bool inputingLastName = true;
        for (unsigned i=2; i < cardDetails.length(); ++i)
         {
           switch (currentInputType) {
             case 0:
              if(cardDetails.at(i) != '^') {
                cardNumber += cardDetails.at(i);
              } else {
                currentInputType++;
              }
              break;

            case 1:
              if(cardDetails.at(i) != '^') {
                if(cardDetails.at(i) == '/'){
                  inputingLastName = false;
                  break;
                }
                if(inputingLastName) {
                  cardLastName += cardDetails.at(i);
                } else {
                  cardFirstName += cardDetails.at(i);
                }
              } else {
                currentInputType++;
              }
              break;

            case 2:
              cardYear += cardDetails.at(i);
              cardYear += cardDetails.at(i + 1);
              cardMonth += cardDetails.at(i + 2);
              cardMonth += cardDetails.at(i + 3);
              currentInputType++;
              break;
           }
       }
    }
  }
  void clearCardInfo() {
    cardDetails = "";
    cardNumber = "";
    cardLastName = "";
    cardFirstName = "";
    cardMonth = "";
    cardYear = "";
  }
  bool callpaymentApi() {
    return true;
  }
  void createPrint() {
    // run a process and create a streambuf that reads its stdout and stderr

    system(("node ../vendingGenorator.js '" + cardFirstName + " " + cardLastName + "'").c_str()) ;
  }
  int main() {
        while(true) {

          readCard();
          bool paid = callpaymentApi();
          if(paid) {
            createPrint();
          }
          clearCardInfo();

        }
        return 0;
     }
      //  std::cout << cardDetails << '\n';
