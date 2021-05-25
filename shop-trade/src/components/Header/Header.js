import cart from "../../assets/cart.svg";
import menu from "../../assets/menu.svg";

function Header(props) {
  const headingStyle = {
    fontSize: "20px",
    fontWeight: "700",
  };

  const itemCountStyle = {
    height: "17px",
    width: "17px",
    borderRadius: "50%",
    backgroundColor: "#E64C09",
    zIndex: "10",
    position: "absolute",
    marginLeft: "26px",
    marginTop: "-4px",
    color: "white",
    fontSize: "10px",
  };

  const iconHeight = {
    height: "25px",
  };

  const menuStyle = {
    height: "15px",
    marginRight: "16px",
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-4 pt-3 pb-3">
        <div
          className="heading px-1 d-flex align-items-center"
          style={headingStyle}
        >
          <img
            src={menu}
            style={menuStyle}
            className="menu"
            alt=""
            onClick={() => {
              props.setShowMenu(!props.showMenu);
            }}
          ></img>
          All Products
        </div>
        <div className="px-2 cart">
          {props.cartCount !== 0 && (
            <div
              className="cart-item-count d-flex justify-content-center align-items-center text-center"
              style={itemCountStyle}
            >
              {props.cartCount}
            </div>
          )}

          <img
            src={cart}
            style={iconHeight}
            alt=""
            onClick={() => {
              props.setShowCart(true);
            }}
          ></img>
        </div>
      </div>
    </>
  );
}

export default Header;
