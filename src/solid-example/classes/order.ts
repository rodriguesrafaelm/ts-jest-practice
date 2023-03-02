import { PersistenceProtocol } from './interfaces/persistence-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { OrderStatus } from './interfaces/order-status';
import { CustomerOrder } from './interfaces/customer-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistence: PersistenceProtocol,
    private readonly customer: CustomerOrder,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkOut(): void {
    if (this.cart.isEmpty()) {
      console.log('Carrinho vazio');
      return;
    }
    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Seu pedido foi recebido com o total de R$ ${this.cart.totalWithDiscount()}`,
    );
    this.persistence.saveOrder();
    this.cart.clear();
    console.log('Compra efetuada com sucesso por ' + this.customer.getName());
  }
}
