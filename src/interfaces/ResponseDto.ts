export interface ResponseDto {
    /**
     * The message received in the response
     * @example "Payment successful"
     */
    message: string;
  
    /**
     * The reference code of the transaction
     * @example "ABC123"
     */
    referenceCode: string;
  
    /**
     * The payment method used
     * @example "VISA"
     */
    lapPaymentMethod: string;
  
    /**
     * The type of the payment method
     * @example "Credit Card"
     */
    lapPaymentMethodType: string;
  
    /**
     * The date when the processing occurred
     * @example "2024-06-23T18:25:43.511Z"
     */
    processingDate: string; // You can use string here for the ISO date format
  }
  