import { Box, Typography , Card, CardContent,Grid,TextField,Dialog,DialogTitle,DialogContent,DialogActions,Button} from "@mui/material";
// import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState,useMemo ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function Employees() {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const queryClient = useQueryClient()
    const itemsPerPage = 6
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    useEffect(() => {setPage(1)}, [search])

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`https://employee-dashboard-29et.onrender.com/employees/${id}`, {
                method: "DELETE",
            });
             if (!res.ok) {
                throw new Error("Delete failed");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
            setOpenDialog(false)
        }
    })

    const handleOpenDialog = (id: string) => {
        setSelectedId(id);
        setOpenDialog(true);
    }

    const handleConfirmDelete = () => {
    if (selectedId) {
        deleteMutation.mutate(selectedId);
        }
    }   

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedId(null);
    }

    const fetchEmployees = async () => {
        const response = await fetch("https://employee-dashboard-29et.onrender.com/employees");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json()
    }


    const { data=[], isLoading, error } = useQuery({queryKey: ["employees"],queryFn: fetchEmployees});

    const filteredEmployees = useMemo(() => {
        return data.filter((employee: any) =>
            employee.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, data])

    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex)

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    if (isLoading) return <Typography>Loading...</Typography>;

    if (error) return <Typography>Error fetching employees</Typography>;



return (


  <Box sx={{ p: 2,mt: 4,width: "100%" }}>
    <Button variant="contained" sx={{ mt: 0 }} onClick={() => navigate("/add-employee")}>Add Employee</Button>


    <TextField label="Search Employee" variant="outlined" fullWidth sx={{mt:3,mb:2}} value={search} onChange={(e) => setSearch(e.target.value)}/>

    <Typography variant="h4" gutterBottom>Employees List</Typography>

    <Grid container spacing={2} sx={{justifyContent:"center"}}>  
        {paginatedEmployees.map((employee:any) => (
            <Grid size={filteredEmployees.length === 1 ? { xs: 12 }: { xs: 12, sm: 6, md: 4 }} key={employee.id}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">{employee.name}</Typography>
                        <Typography variant="body1">Email: {employee.email}</Typography>
                        <Typography variant="body1">Role: {employee.role}</Typography>
                        <Button variant="contained" sx={{mt:2}} onClick={() => navigate(`/edit-employee/${employee.id}`)}>Edit</Button>
                        <Button variant="outlined" sx={{mt:2,ml:1}} onClick={() => handleOpenDialog(employee.id)}>Delete</Button>
                    </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}>
            <Button variant="contained" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
            <Typography sx={{ alignSelf: "center" }}>Page {page} of {totalPages}</Typography>
            <Button variant="contained" disabled={page === totalPages} onClick={() => setPage(page + 1)}> Next</Button>
        </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this employee?</Typography>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>No</Button>
                <Button color="error" onClick={handleConfirmDelete}>Yes, Delete</Button>
            </DialogActions>
        </Dialog>
  </Box>
)}   
   

