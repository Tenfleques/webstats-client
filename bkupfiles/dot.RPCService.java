/**
     * Get all of the key-value pairs that have keys within the range from...to
     * //@param //storeName   store to query
     * //@param //[keys]        start of the range (inclusive)
     * //@return A JsonArray representing the key-value pairs for the given list of keys  in the provided
     */
    /*@GET()
    @Path("/stats/{storeName}/range/{listofkeys}")
    @Produces(MediaType.APPLICATION_JSON)
    public String keyRangeForStore(@PathParam("storeName") final String storeName,
                                               @PathParam("from") final String from,
                                               @PathParam("to") final String to) {
        return buildJson(streams.store(storeName, QueryableStoreTypes.<String, String>keyValueStore()).range(from, to));
    }*/