import { useState, useEffect } from "react";
import { Facility } from "../types/CampTypes";
import { getFacilities } from "../service/campService";
import { useSearchStore } from "@/lib/store/searchStore";

export type FilterModalType = "date" | "guest" | "price" | "all" | null;

export function useFilterBar() {
    const { filters, updateFilter, setFilters } = useSearchStore();

    // Inputs
    const [location, setLocation] = useState(filters.q ?? "");
    const [checkIn, setCheckIn] = useState(filters.checkIn ?? "");
    const [checkOut, setCheckOut] = useState(filters.checkOut ?? "");
    const [guests, setGuests] = useState({
        adults: filters.adults ?? 1,
        children: filters.children ?? 0,
        pets: filters.pets ?? 0,
    });
    const [priceRange, setPriceRange] = useState([
        filters.minPrice ?? 0,
        filters.maxPrice ?? 5000,
    ]);

    // Modal states
    const [openModal, setOpenModal] = useState<FilterModalType>(null);

    // Facilities
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loadingFacilities, setLoadingFacilities] = useState(true);

    /* Load facilities */
    useEffect(() => {
        async function load() {
            try {
                const data = await getFacilities();
                setFacilities(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingFacilities(false);
            }
        }
        load();
    }, []);

    /* Sync from Store to Local State */
    useEffect(() => {
        if (filters.q !== undefined && filters.q !== location) {
            setLocation(filters.q);
        }
    }, [filters.q]);

    useEffect(() => {
        const min = filters.minPrice ?? 0;
        const max = filters.maxPrice ?? 5000;
        if (priceRange[0] !== min || priceRange[1] !== max) {
            setPriceRange([min, max]);
        }
    }, [filters.minPrice, filters.maxPrice]);

    useEffect(() => {
        if (filters.checkIn !== checkIn) setCheckIn(filters.checkIn ?? "");
        if (filters.checkOut !== checkOut) setCheckOut(filters.checkOut ?? "");
    }, [filters.checkIn, filters.checkOut]);

    useEffect(() => {
        setGuests((prev) => {
            if (
                prev.adults !== (filters.adults ?? 1) ||
                prev.children !== (filters.children ?? 0) ||
                prev.pets !== (filters.pets ?? 0)
            ) {
                return {
                    adults: filters.adults ?? 1,
                    children: filters.children ?? 0,
                    pets: filters.pets ?? 0,
                };
            }
            return prev;
        });
    }, [filters.adults, filters.children, filters.pets]);

    /* Debounce search (Write back to store) */
    useEffect(() => {
        const t = setTimeout(() => {
            if (location !== (filters.q ?? "")) {
                updateFilter("q", location);
            }
        }, 300);
        return () => clearTimeout(t);
    }, [location, filters.q, updateFilter]);

    /* Update price filter (Write back to store) */
    useEffect(() => {
        const t = setTimeout(() => {
            const currentMin = filters.minPrice ?? 0;
            const currentMax = filters.maxPrice ?? 5000;
            if (priceRange[0] !== currentMin || priceRange[1] !== currentMax) {
                setFilters({
                    ...filters,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                });
            }
        }, 250);
        return () => clearTimeout(t);
    }, [priceRange, filters, setFilters]);

    /* Events */
    const handleDateChange = (ci: string, co: string) => {
        setCheckIn(ci);
        setCheckOut(co);
        setFilters({
            ...filters,
            checkIn: ci || undefined,
            checkOut: co || undefined,
        });
    };

    const handleGuestChange = (
        type: "adults" | "children" | "pets",
        delta: number
    ) => {
        const updated = {
            ...guests,
            [type]: Math.max(0, guests[type] + delta),
        };
        setGuests(updated);
        setFilters({
            ...filters,
            adults: updated.adults,
            children: updated.children,
            pets: updated.pets,
        });
    };

    return {
        location,
        setLocation,
        checkIn,
        checkOut,
        guests,
        priceRange,
        setPriceRange,
        openModal,
        setOpenModal,
        facilities,
        loadingFacilities,
        handleDateChange,
        handleGuestChange,
    };
}
