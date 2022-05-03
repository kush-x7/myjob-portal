import ReactPaginate from "react-paginate";
const Pagination = (props) => {
  return (
    <div className="mb-8 flex justify-center">
      <ReactPaginate
        previousLabel={<PaginationButton symbol="<" />}
        nextLabel={<PaginationButton symbol=">" />}
        activeClassName="bg-[#43AFFF33]"
        className="text-blue-light mt-8 flex gap-3"
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageLinkClassName=" w-8 h-8 rounded border-[#303F60]/20 flex justify-center items-center text-[#7A839A] border-[1px]  text-xs "
        {...props}
      />
    </div>
  );
};
export default Pagination;

const PaginationButton = (props) => {
  return (
    <div className=" flex h-8 w-8  items-center justify-center rounded border-[1px] border-[#303F60]/20 text-xs  text-[#7A839A] ">
      <p>{props.symbol}</p>
    </div>
  );
};
