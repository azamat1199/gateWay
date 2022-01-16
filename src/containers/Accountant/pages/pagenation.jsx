
import TablePagination from "@material-ui/core/TablePagination";

 const [rowsPerPage, setRowsPerPage] = useState(10);
 const [page, setPage] = useState(0);
 const fethcStudents = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`applicant/list/?limit=${rowsPerPage}`);
      console.log(res);
      const { status, data } = res;
      const { results, count,amount ,next } = data;
      if (status === 200) {
        setStudents(results);
        setAmount(amount)
        setCount(count);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };
  const handlePageChange = async(e, newPage) => {
    setPage(newPage);
    setLoading(true)
     try {
        const res = await Axios.get(`/applicant/list/?limit=${rowsPerPage}&offset=${newPage*rowsPerPage}`);
        const { status, data } = res;
        const { results } = data;
        if (status == 200) {
          setStudents(results);
        }
        console.log(res);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
  };

  const handleChangeRowsPerPage = async (event) => {
    console.log(rowsPerPage);
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
    }
    useEffect(() => {
        fethcStudents();
      }, [rowsPerPage]);
      <TablePagination
      rowsPerPageOptions={[20,40,60]}
      component="table"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleChangeRowsPerPage}
  />